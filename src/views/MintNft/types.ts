export interface AttributeItem {
  trait_type: string;
  value: string;
}

export interface NftItem {
  attributes: AttributeItem[];
  cloth: string;
  description: string;
  hairColor: string;
  hairLength: string;
  image: string;
  name: string;
  tokenId: number;
}
