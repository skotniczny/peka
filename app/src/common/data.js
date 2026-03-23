export const API_URL = (process.env.NODE_ENV !== "production") ? "http://localhost:3001" : "https://peka.skotisz.usermd.net"
export const BASENAME = (process.env.NODE_ENV !== "production") ? "/" : "/peka"

export const tramsColors = {
  "1": {
    backgroundColor: "rgb(208, 0, 111)",
    color: "#fff"
  },
  "2": {
    backgroundColor: "rgb(98, 181, 229)",
    color: "#231f20"
  },
  "3": {
    backgroundColor: "rgb(108, 29, 69)",
    color: "#fff"
  },
  "4": {
    backgroundColor: "rgb(17, 87, 64)",
    color: "#fff"
  },
  "5": {
    backgroundColor: "rgb(108, 194, 74)",
    color: "#231f20"
  },
  "6": {
    backgroundColor: "rgb(0, 150, 57)",
    color: "#fff"
  },
  "7": {
    backgroundColor: "rgb(0, 53, 148)",
    color: "#fff"
  },
  "8": {
    backgroundColor: "rgb(218, 41, 28)",
    color: "#fff"
  },
  "9": {
    backgroundColor: "rgb(255, 103, 31)",
    color: "#231f20"
  },
  "10": {
    backgroundColor: "rgb(241, 180, 52)",
    color: "#231f20"
  },
  "11": {
    backgroundColor: "rgb(60, 219, 192)",
    color: "#231f20"
  },
  "12": {
    backgroundColor: "rgb(203, 163, 216)",
    color: "#231f20"
  },
  "13": {
    backgroundColor: "rgb(173, 132, 31)",
    color: "#fff"
  },
  "14": {
    backgroundColor: "rgb(148, 96, 55)",
    color: "#fff"
  },
  "15": {
    backgroundColor: "rgb(162, 170, 173)",
    color: "#231f20"
  },
  "16": {
    backgroundColor: "rgb(68, 0, 153)",
    color: "#fff"
  },
  "17": {
    backgroundColor: "rgb(0, 79, 113)",
    color: "#fff"
  },
  "18": {
    backgroundColor: "rgb(254, 219, 0)",
    color: "#231f20"
  },
  "19": {
    backgroundColor: "rgb(0, 178, 169)",
    color: "#fff"
  },
  "20": {
    backgroundColor: "rgb(125, 85, 199)",
    color: "#fff"
  },
}

export const tramLines = [...Object.keys(tramsColors).slice(0, -1), "28", "T7"]

export const busLines = [
  "121", "122", "123", "124", "125", "145", "146", "148", "149", "151", "152", "153", "154", "156", "157", "158", "159", "160", "162", "163", "164", "166", "167", "168", "169", "170", "171", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "188", "189", "190", "191", "193", "194", "195", "196", "198", "312", "320", "321", "322", "323", "341", "342", "348", "388", "392", "394", "396", "397", "416", "425", "431", "432", "433", "501", "502", "503", "511", "512", "513", "527", "560", "561", "602", "603", "610", "611", "614", "616", "651", "690", "701", "702", "703", "704", "707", "710", "715", "716", "717", "727", "728", "729", "789", "802", "803", "804", "805", "811", "812", "813", "821", "822", "825", "826", "832", "833", "835", "837", "881", "882", "886", "893", "901", "902", "904", "905", "907", "911"
]

export const nightTramLines = [
  "201", "202"
]

const nightBusLines = [
  "212", "213", "214", "215", "216", "217", "218", "219", "220", "221", "222", "223", "224", "226", "227", "250", "252", "253", "257", "258"
]

export const nightLines = [...nightTramLines, ...nightBusLines]
