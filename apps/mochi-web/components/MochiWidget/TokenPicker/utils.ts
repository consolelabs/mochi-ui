import groupBy from 'lodash.groupby'
import { SectionBase } from './type'

export function sectionFormatter<T>(list: T[], interatee: string) {
  const sections: SectionBase<T>[] = Object.entries(groupBy(list, interatee)).map(([key, value]) => ({
    title: key,
    data: value
  }))
  return sections
}