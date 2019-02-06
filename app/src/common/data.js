export const API_URL = (process.env.NODE_ENV !== "production") ? "http://localhost:3001" : "https://peka.mybluemix.net"

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

export const tramLines = Object.keys(tramsColors).slice(0, -2)

export const busLines = [
  "144", "145", "146", "147", "148", "149", "150", "151", "152", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "171", "173", "174", "175", "176", "177", "178", "179", "180", "181", "182", "183", "184", "185", "186", "187", "188", "189", "190", "191", "192", "193", "194", "195", "196", "198", "320", "321", "322", "341", "348", "727", "801", "833", "834", "911", "T1"
]
