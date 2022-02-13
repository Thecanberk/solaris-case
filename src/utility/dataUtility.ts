import { ISolarisData } from "../App";

export interface INormalizeStatusData {
  count: number;
  [key: string]: any;
  label: string;
}

export interface ITaxonomytatusData {
  dead: number;
  alive: number;
  unknown: number;
  label: string;
}

export const countData = (
  data: ISolarisData[],
  keys: (keyof ISolarisData)[],
  time?: string,
  filterFunc?: (arg0: any) => boolean
) => {
  const statusMap = new Map<string, INormalizeStatusData>();
  const filteredData = filterFunc ? data.filter(filterFunc) : data;

  filteredData.forEach((item) => {
    keys.forEach((key) => {
      if (statusMap.get(item[key]) == null) {
        statusMap.set(item[key], {
          count: 0,
          label: item[key],
          key,
          status: { dead: 0, alive: 0, unknown: 0 },
          time,
        });
      }
      const normalizeData = statusMap.get(item[key]);
      if (normalizeData) {
        normalizeData.count = normalizeData.count + 1;
        normalizeData.status[item.status] += 1;
      }
    });
  });
  const statusArray = Array.from(statusMap.values());
  return statusArray;
};

export const taxonomyData = (data: ISolarisData[], minSampleSize: number = 10) => {
    let taxonomyMap = new Map<string, ITaxonomytatusData>();
    data.forEach((item) => {
        item.taxonomy.forEach((taxo) => {
            if (taxonomyMap.get(taxo) == null) {
                taxonomyMap.set(taxo, {dead: 0, alive: 0, unknown:0, label: taxo})
            } 
                let normalizeData = taxonomyMap.get(taxo);
                const key: keyof ITaxonomytatusData = item.status;
                if (normalizeData) {
                    // @ts-ignore
                    normalizeData[key] += 1;
                }
        })
    })
    const taxonomyArr = Array.from(taxonomyMap.values()).filter((item) => item.alive + item.dead + item.unknown > minSampleSize);
    return taxonomyArr;
}
