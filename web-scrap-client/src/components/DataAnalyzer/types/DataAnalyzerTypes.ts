export interface DataDto {
  id: number;
  name: string;
  url: string;
  storageData: StorageDto[];
}

export interface StorageDto {
  value: number;
  date: Date;
}
