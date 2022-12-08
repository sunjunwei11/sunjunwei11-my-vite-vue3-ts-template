import {
  getTokenURI,
  getTotalSupply,
  getTokenOfOwnerByIndex,
} from '@/wallet/interactWithNft';
import axios from 'axios';
import { watch } from 'vue';
import { useCurrentAddressStore, useNftStore } from '@/store';
import { storeToRefs } from 'pinia';
import { NftItem, AttributeItem } from '../../types';

let allNfts: NftItem[] = [];
let myNfts: NftItem[] = [];

function watchCurrentAddress() {
  const currentAddressStore = useCurrentAddressStore();
  const { currentAddress } = storeToRefs(currentAddressStore);
  watch(currentAddress, () => {
    myNfts = [];
  });
}
watchCurrentAddress();

async function getAllDigiNfts() {
  const totalSupply = await getTotalSupply();

  const tokenIds: number[] = [];
  for (let i = allNfts.length; i < totalSupply; i++) {
    tokenIds.push(i);
  }

  const nftJsons = (await getJsonByTokenIds(tokenIds)) as NftItem[];
  allNfts = [...allNfts, ...nftJsons];
  return allNfts;
}

async function getMyDigiNfts() {
  const currentAddressStore = useCurrentAddressStore();
  const { currentAddress } = currentAddressStore;
  const nftStore = useNftStore();
  const { nftBalance } = nftStore;
  const ownerBalance = Number(nftBalance) || 0;
  let tokenIds: number[] = [];
  const temp = [];
  for (let i = myNfts.length; i < ownerBalance; i++) {
    temp.push(getTokenOfOwnerByIndex(currentAddress, i));
    if (temp.length === 5 || i >= ownerBalance - 1) {
      const res = await Promise.all(temp);
      tokenIds = [...tokenIds, ...res];
    }
  }
  const nftJsons = (await getJsonByTokenIds(tokenIds)) as NftItem[];
  myNfts = [...myNfts, ...nftJsons];
  return myNfts;
}

async function getJsonByTokenIds(tokenIds: number[]) {
  let nfts: NftItem[] = [];
  const tokenIdsLength = tokenIds.length;
  let temp: Promise<string>[] = [];
  for (let i = 0; i < tokenIdsLength; i++) {
    temp.push(getTokenURI(tokenIds[i]));
    if (temp.length === 5 || i >= tokenIdsLength - 1) {
      const urlRes = await Promise.all(temp);
      const jsonPromiseArray = [];
      for (let j = 0; j < urlRes.length; j++) {
        jsonPromiseArray.push(axios.get(urlRes[j]));
      }
      const jsonRes = [...(await Promise.all(jsonPromiseArray))].map(
        (item) => (item as any).data
      );
      nfts = [...nfts, ...jsonRes];
      temp = [];
    }
  }
  nfts.forEach((item, index) => {
    item.tokenId = tokenIds[index];
    item.attributes.forEach((attr: AttributeItem) => {
      if (attr.trait_type === 'Hair Length') {
        item.hairLength = attr.value;
      }
      if (attr.trait_type === 'Hair Color') {
        item.hairColor = attr.value;
      }
      if (attr.trait_type === 'Cloth') {
        item.cloth = attr.value;
      }
    });
  });
  return nfts;
}

export { getAllDigiNfts, getMyDigiNfts };
