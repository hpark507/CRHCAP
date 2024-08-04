export interface PhrasesRow {
  keyword: string;
  reason: string;
  categories: string[];
  quote: string;
  weight: number;
}

export interface PhrasesCSV {
    keyword: string;
    reason: string;
    categories: string;
    quote: string;
    weight: string;
  }

export const SamplePhrases = [
  {
    keyword: "keyword1",
    reason: "reason1",
    categories: ["Leadership", "Culture"],
    quote: "quote1",
    weight: 1,
  },
] as PhrasesRow[];


export const SamplePhrasesCSV = [
    {
        keyword: "keyword1",
        reason: "reason1",
        categories: "Leadership Culture",
        quote: "quote1",
        weight: "1",
      },
] as PhrasesCSV[];
