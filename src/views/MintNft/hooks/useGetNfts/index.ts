import { ref, Ref } from 'vue';
import { TabPaneName } from 'element-plus';
import { getAllDigiNfts, getMyDigiNfts } from './utils';
import { NftItem } from '../../types';

function useGetNfts() {
  const allNftLoading = ref(false);
  const myNftLoading = ref(false);
  const allNfts: Ref<NftItem[]> = ref([]);
  const myNfts: Ref<NftItem[]> = ref([]);

  enum NftTab {
    All = 'ALL',
    My = 'My',
  }

  const nftTab: Ref<string> = ref(NftTab.All);

  const handleTabChange = async (name: TabPaneName) => {
    nftTab.value = name as string;
    await getNfts();
  };

  async function getNfts() {
    if (nftTab.value === NftTab.All) {
      await getAllNft();
    } else {
      await getMyNft();
    }
  }
  async function getAllNft() {
    allNftLoading.value = true;
    try {
      const nftJsons = await getAllDigiNfts();
      allNfts.value = [...nftJsons!]?.reverse() as NftItem[];
      console.log('allNfts: ', allNfts.value);
    } catch (err) {
      console.error(err);
    } finally {
      allNftLoading.value = false;
    }
  }

  async function getMyNft() {
    myNftLoading.value = true;
    const nftJsons = await getMyDigiNfts();
    myNfts.value = [...nftJsons!]?.reverse() as NftItem[];
    console.log('myNfts: ', myNfts.value);
    myNftLoading.value = false;
  }

  return {
    handleTabChange,
    getNfts,
    allNftLoading,
    myNftLoading,
    allNfts,
    myNfts,
    nftTab,
    NftTab,
  };
}

export { useGetNfts };
