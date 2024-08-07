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
    symbol: string;
    emplid: string;
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


// {
//   "keyword": "asdasd",
//   "reason": "asdas",
//   "weight": 3,
//   "table_name": "23881381AAPL",
//   "id": "8c29b43a-e0bd-4a91-bf12-04351af35b5b",
//   "categories": [
//       "Healthcare"
//   ],
//   "quote": "asdasd",
//   "symbol": "AAPL"
// }

export const SamplePhrasesCSV = [
    {
        keyword: "keyword1",
        reason: "reason1",
        categories: "Leadership Culture",
        quote: "quote1",
        weight: "1",
        symbol: "AAPL",
        emplid: "23881381",
      },
] as PhrasesCSV[];
