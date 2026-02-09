import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  capitalize,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import FilterBar from "../../components/ui/FilterBar";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { basePath } from "../../utils";

const selectorOptions = [
  {
    id: "2",
    name: "Move In Pradise Estate",
    subOptions: [
      ({
        id: "4",
        name: "Block-1",
        childOptions: [
          { id: "10", name: "Block-1-Unit-1" },
          { id: "11", name: "Block-1-Unit2" },
          { id: "41", name: "Block-1-No lease" },
          { id: "1565", name: "Block-1-Unit 3" },
        ],
      },
      {
        id: "5",
        name: "Block A",
        childOptions: [
          ({ id: "12", name: "Block A-101" },
          { id: "13", name: "Block A-102" },
          { id: "14", name: "Block A-103" },
          { id: "15", name: "Block A-104" },
          { id: "16", name: "Block A-105" },
          { id: "1176", name: "Block A-106" },
          { id: "1373", name: "Block A-107" },
          { id: "1387", name: "Block A-108" },
          { id: "1692", name: "Block A-Rajitha ab31" },
          { id: "1693", name: "Block A-Rajitha ab32" },
          { id: "2028", name: "Block A-andd" },
          { id: "2031", name: "Block A-andd" }),
        ],
      },
      {
        id: "6",
        name: "2022June Blocks",
        childOptions: [
          ({ id: "17", name: "2022June Blocks-100" },
          { id: "18", name: "2022June Blocks-101" },
          { id: "19", name: "2022June Blocks-102" },
          { id: "20", name: "2022June Blocks-103" },
          { id: "21", name: "2022June Blocks-104" },
          { id: "22", name: "2022June Blocks-105" },
          { id: "23", name: "2022June Blocks-106" },
          { id: "755", name: "2022June Blocks-1m" }),
        ],
      },
      {
        id: "10",
        name: "Block B",
        childOptions: [
          ({ id: "31", name: "Block B-101" },
          { id: "36", name: "Block B-102" },
          { id: "37", name: "Block B-103" },
          { id: "38", name: "Block B-104" },
          { id: "39", name: "Block B-105" },
          { id: "40", name: "Block B-106" },
          { id: "42", name: "Block B-107" },
          { id: "512", name: "Block B-110" },
          { id: "513", name: "Block B-111" },
          { id: "514", name: "Block B-112" },
          { id: "515", name: "Block B-113" },
          { id: "516", name: "Block B-114" },
          { id: "517", name: "Block B-115" },
          { id: "518", name: "Block B-116" },
          { id: "2033", name: "Block B-andd" }),
        ],
      },
      {
        id: "11",
        name: "Block 2",
        childOptions: [
          ({ id: "32", name: "Block 2-1" },
          { id: "33", name: "Block 2-2" },
          { id: "34", name: "Block 2-3" },
          { id: "35", name: "Block 2-4" },
          { id: "2026", name: "Block 2-andd" },
          { id: "2027", name: "Block 2-andd" }),
        ],
      },
      {
        id: "12",
        name: "Block C",
        childOptions: [
          ({ id: "43", name: "Block C-101" },
          { id: "44", name: "Block C-102" },
          { id: "45", name: "Block C-103" },
          { id: "46", name: "Block C-104" },
          { id: "47", name: "Block C-105" },
          { id: "48", name: "Block C-106" },
          { id: "49", name: "Block C-107" },
          { id: "50", name: "Block C-108" },
          { id: "51", name: "Block C-109" },
          { id: "52", name: "Block C-110" },
          { id: "95", name: "Block C-111" },
          { id: "96", name: "Block C-112" },
          { id: "1369", name: "Block C-120" }),
        ],
      },
      {
        id: "25",
        name: "Block D",
        childOptions: [
          ({ id: "97", name: "Block D-101" },
          { id: "1091", name: "Block D-102" },
          { id: "1092", name: "Block D-103" },
          { id: "1093", name: "Block D-104" },
          { id: "1094", name: "Block D-105" },
          { id: "1103", name: "Block D-106" },
          { id: "1104", name: "Block D-201" },
          { id: "1105", name: "Block D-202" },
          { id: "1106", name: "Block D-203" },
          { id: "1107", name: "Block D-204" },
          { id: "1193", name: "Block D-205" }),
        ],
      },
      {
        id: "26",
        name: "R01",
        childOptions: [
          ({ id: "98", name: "R01-1" },
          { id: "99", name: "R01-2" },
          { id: "100", name: "R01-3" },
          { id: "101", name: "R01-4" },
          { id: "102", name: "R01-5" },
          { id: "103", name: "R01-6" }),
        ],
      },
      { id: "27", name: "R02", childOptions: [] },
      {
        id: "28",
        name: "S01",
        childOptions: [
          { id: "104", name: "S01-101" },
          { id: "105", name: "S01-102" },
          { id: "106", name: "S01-103" },
        ],
      },
      {
        id: "29",
        name: "S02",
        childOptions: [
          { id: "107", name: "S02-201" },
          { id: "108", name: "S02-202" },
          { id: "109", name: "S02-203" },
        ],
      },
      {
        id: "36",
        name: "Block F",
        childOptions: [
          ({ id: "122", name: "Block F-101" },
          { id: "582", name: "Block F-102" },
          { id: "583", name: "Block F-103" },
          { id: "584", name: "Block F-104" },
          { id: "585", name: "Block F-105" },
          { id: "586", name: "Block F-106" },
          { id: "587", name: "Block F-107" },
          { id: "588", name: "Block F-108" },
          { id: "589", name: "Block F-109" },
          { id: "590", name: "Block F-110" },
          { id: "591", name: "Block F-111" },
          { id: "592", name: "Block F-112" },
          { id: "593", name: "Block F-11" },
          { id: "594", name: "Block F-3" },
          { id: "595", name: "Block F-114" },
          { id: "596", name: "Block F-115" },
          { id: "597", name: "Block F-116" },
          { id: "598", name: "Block F-117" },
          { id: "599", name: "Block F-118" },
          { id: "600", name: "Block F-119" }),
        ],
      },
      { id: "37", name: "Empty Block test", childOptions: [] },
      { id: "40", name: "Chat Block-3888888", childOptions: [] },
      { id: "41", name: "CHat Block - 44", childOptions: [] },
      {
        id: "43",
        name: "Chat group - 55555555",
        childOptions: [],
      },
      {
        id: "47",
        name: "Chat 5AUG",
        childOptions: [
          ({ id: "126", name: "Chat 5AUG-Unit -1" },
          { id: "127", name: "Chat 5AUG-Unit2" },
          { id: "128", name: "Chat 5AUG-unit3" },
          { id: "129", name: "Chat 5AUG-unit4" },
          { id: "130", name: "Chat 5AUG-Unit-5" },
          { id: "131", name: "Chat 5AUG-unit-6" },
          { id: "132", name: "Chat 5AUG-unit-7" }),
        ],
      },
      {
        id: "48",
        name: "5 AUG -2",
        childOptions: [
          ({ id: "1474", name: "5 AUG -2-101" },
          { id: "1475", name: "5 AUG -2-102" },
          { id: "1476", name: "5 AUG -2-103" },
          { id: "2177", name: "5 AUG -2-104" },
          { id: "2178", name: "5 AUG -2-105" },
          { id: "2318", name: "5 AUG -2-1475" }),
        ],
      },
      {
        id: "49",
        name: "A",
        childOptions: [
          ({ id: "133", name: "A-100" },
          { id: "134", name: "A-101" },
          { id: "135", name: "A-102" },
          { id: "136", name: "A-103" },
          { id: "137", name: "A-104" },
          { id: "138", name: "A-105" },
          { id: "139", name: "A-106" },
          { id: "140", name: "A-107" },
          { id: "141", name: "A-108" },
          { id: "142", name: "A-109" },
          { id: "143", name: "A-110" },
          { id: "144", name: "A-111" },
          { id: "145", name: "A-112" },
          { id: "146", name: "A-113" },
          { id: "147", name: "A-114" },
          { id: "148", name: "A-115" },
          { id: "149", name: "A-116" },
          { id: "150", name: "A-117" },
          { id: "151", name: "A-118" },
          { id: "152", name: "A-119" },
          { id: "153", name: "A-120" },
          { id: "1192", name: "A-121" },
          { id: "1314", name: "A-122" },
          { id: "1315", name: "A-123" },
          { id: "1316", name: "A-124" },
          { id: "1317", name: "A-125" },
          { id: "1318", name: "A-126" },
          { id: "1319", name: "A-127" },
          { id: "1320", name: "A-128" },
          { id: "1321", name: "A-129" },
          { id: "1322", name: "A-130" },
          { id: "1323", name: "A-131" },
          { id: "1324", name: "A-132" },
          { id: "1325", name: "A-133" },
          { id: "1326", name: "A-134" },
          { id: "1327", name: "A-135" },
          { id: "1328", name: "A-136" },
          { id: "1329", name: "A-137" },
          { id: "1330", name: "A-138" },
          { id: "1331", name: "A-139" },
          { id: "1332", name: "A-140" },
          { id: "1333", name: "A-141" },
          { id: "1334", name: "A-142" },
          { id: "1335", name: "A-143" },
          { id: "1336", name: "A-144" },
          { id: "1337", name: "A-145" },
          { id: "1338", name: "A-146" },
          { id: "1339", name: "A-147" },
          { id: "1340", name: "A-148" },
          { id: "1341", name: "A-149" },
          { id: "1342", name: "A-150" },
          { id: "1343", name: "A-151" },
          { id: "1344", name: "A-152" },
          { id: "1345", name: "A-153" },
          { id: "1346", name: "A-154" },
          { id: "1347", name: "A-155" },
          { id: "1348", name: "A-156" },
          { id: "1349", name: "A-157" },
          { id: "1350", name: "A-158" },
          { id: "1351", name: "A-159" },
          { id: "1352", name: "A-160" },
          { id: "1353", name: "A-161" },
          { id: "1354", name: "A-162" },
          { id: "1355", name: "A-163" },
          { id: "1356", name: "A-164" },
          { id: "1357", name: "A-165" },
          { id: "1358", name: "A-166" },
          { id: "1359", name: "A-167" },
          { id: "1360", name: "A-168" },
          { id: "1361", name: "A-169" },
          { id: "1362", name: "A-170" },
          { id: "1363", name: "A-171" },
          { id: "1364", name: "A-172" },
          { id: "1365", name: "A-173" },
          { id: "1366", name: "A-174" },
          { id: "1367", name: "A-175" },
          { id: "1374", name: "A-176" },
          { id: "1378", name: "A-july18unit" },
          { id: "1379", name: "A-A-600" },
          { id: "1388", name: "A-177" },
          { id: "1389", name: "A-178" },
          { id: "1440", name: "A-200" },
          { id: "1441", name: "A-201" },
          { id: "1461", name: "A-202" },
          { id: "1467", name: "A-203" },
          { id: "1570", name: "A-204" },
          { id: "1974", name: "A-Rajitha acb5" }),
        ],
      },
      {
        id: "50",
        name: "B",
        childOptions: [
          ({ id: "154", name: "B-121" },
          { id: "155", name: "B-122" },
          { id: "156", name: "B-123" },
          { id: "157", name: "B-124" },
          { id: "158", name: "B-125" },
          { id: "159", name: "B-126" },
          { id: "160", name: "B-127" },
          { id: "161", name: "B-128" },
          { id: "162", name: "B-129" },
          { id: "163", name: "B-130" },
          { id: "164", name: "B-131" },
          { id: "165", name: "B-132" },
          { id: "166", name: "B-133" },
          { id: "167", name: "B-134" },
          { id: "168", name: "B-135" },
          { id: "169", name: "B-136" },
          { id: "170", name: "B-137" },
          { id: "171", name: "B-138" },
          { id: "172", name: "B-139" },
          { id: "173", name: "B-140" },
          { id: "629", name: "B-141" },
          { id: "1135", name: "B-142" },
          { id: "1136", name: "B-143" },
          { id: "1137", name: "B-144" },
          { id: "1138", name: "B-145" },
          { id: "1170", name: "B-146" },
          { id: "1454", name: "B-147" },
          { id: "1472", name: "B-148" },
          { id: "1473", name: "B-149" },
          { id: "1596", name: "B-150" },
          { id: "1597", name: "B-151" },
          { id: "1681", name: "B-Rajitha ab30" },
          { id: "1732", name: "B-Rajitha acb44" },
          { id: "1958", name: "B-155" },
          { id: "1959", name: "B-156" },
          { id: "1960", name: "B-157" },
          { id: "1961", name: "B-158" },
          { id: "1962", name: "B-159" },
          { id: "1963", name: "B-160" },
          { id: "1964", name: "B-161" },
          { id: "1965", name: "B-162" },
          { id: "1966", name: "B-163" },
          { id: "1967", name: "B-164" },
          { id: "1968", name: "B-165" },
          { id: "1969", name: "B-166" },
          { id: "1970", name: "B-167" },
          { id: "1971", name: "B-168" },
          { id: "1972", name: "B-169" },
          { id: "1973", name: "B-170" },
          { id: "2018", name: "B-500" },
          { id: "2019", name: "B-501" }),
        ],
      },
      {
        id: "51",
        name: "Block-Z",
        childOptions: [
          ({ id: "636", name: "Block-Z-101" },
          { id: "637", name: "Block-Z-102" },
          { id: "638", name: "Block-Z-103" },
          { id: "639", name: "Block-Z-104" },
          { id: "640", name: "Block-Z-105" },
          { id: "641", name: "Block-Z-106" }),
        ],
      },
      {
        id: "52",
        name: "Vasanth",
        childOptions: [{ id: "174", name: "Vasanth-1" }],
      },
      {
        id: "53",
        name: "Sep block",
        childOptions: [
          ({ id: "176", name: "Sep block-101" },
          { id: "177", name: "Sep block-102" },
          { id: "178", name: "Sep block-103" },
          { id: "179", name: "Sep block-104" },
          { id: "410", name: "Sep block-105" },
          { id: "411", name: "Sep block-106" },
          { id: "429", name: "Sep block-107" },
          { id: "2317", name: "Sep block-410" }),
        ],
      },
      {
        id: "80",
        name: "OC",
        childOptions: [
          ({ id: "322", name: "OC-1" },
          { id: "323", name: "OC-2" },
          { id: "324", name: "OC-3" },
          { id: "325", name: "OC-4" },
          { id: "326", name: "OC-5" },
          { id: "452", name: "OC-6" },
          { id: "453", name: "OC-7" },
          { id: "454", name: "OC-8" },
          { id: "455", name: "OC-9" },
          { id: "456", name: "OC-10" },
          { id: "457", name: "OC-11" },
          { id: "458", name: "OC-12" },
          { id: "459", name: "OC-13" },
          { id: "460", name: "OC-14" },
          { id: "461", name: "OC-15" },
          { id: "462", name: "OC-16" },
          { id: "463", name: "OC-17" },
          { id: "464", name: "OC-18" },
          { id: "465", name: "OC-19" },
          { id: "466", name: "OC-20" },
          { id: "467", name: "OC-21" },
          { id: "468", name: "OC-22" }),
        ],
      },
      {
        id: "81",
        name: "Nov",
        childOptions: [
          { id: "318", name: "Nov-1" },
          { id: "319", name: "Nov-2" },
          { id: "320", name: "Nov-3" },
          { id: "321", name: "Nov-4" },
          { id: "2412", name: "Nov-5" },
        ],
      },
      {
        id: "82",
        name: "Dec",
        childOptions: [
          ({ id: "315", name: "Dec-1" },
          { id: "316", name: "Dec-2" },
          { id: "317", name: "Dec-3" },
          { id: "765", name: "Dec-100" },
          { id: "766", name: "Dec-101" },
          { id: "767", name: "Dec-102" }),
        ],
      },
      {
        id: "84",
        name: "Jan",
        childOptions: [
          { id: "343", name: "Jan-100" },
          { id: "344", name: "Jan-101" },
          { id: "345", name: "Jan-102" },
        ],
      },
      {
        id: "85",
        name: "Feb",
        childOptions: [
          { id: "346", name: "Feb-200" },
          { id: "347", name: "Feb-201" },
          { id: "348", name: "Feb-202" },
        ],
      },
      {
        id: "86",
        name: "March",
        childOptions: [
          { id: "352", name: "March-300" },
          { id: "353", name: "March-301" },
          { id: "354", name: "March-302" },
          { id: "355", name: "March-303" },
        ],
      },
      {
        id: "87",
        name: "April",
        childOptions: [
          ({ id: "356", name: "April-400" },
          { id: "357", name: "April-401" },
          { id: "358", name: "April-402" },
          { id: "409", name: "April-403" },
          { id: "506", name: "April-APR-1" },
          { id: "507", name: "April-APR-2" },
          { id: "510", name: "April-APR-3" },
          { id: "511", name: "April-APR-4" },
          { id: "744", name: "April-10" },
          { id: "1566", name: "April-500" },
          { id: "2441", name: "April-409" }),
        ],
      },
      {
        id: "88",
        name: "June",
        childOptions: [
          ({ id: "360", name: "June-600" },
          { id: "361", name: "June-601" },
          { id: "362", name: "June-602" },
          { id: "363", name: "June-603" },
          { id: "364", name: "June-604" },
          { id: "365", name: "June-605" },
          { id: "366", name: "June-606" }),
        ],
      },
      {
        id: "89",
        name: "Block M",
        childOptions: [
          ({ id: "367", name: "Block M-700" },
          { id: "368", name: "Block M-701" },
          { id: "369", name: "Block M-702" },
          { id: "572", name: "Block M-101" },
          { id: "573", name: "Block M-102" },
          { id: "574", name: "Block M-103" },
          { id: "575", name: "Block M-104" },
          { id: "576", name: "Block M-105" },
          { id: "577", name: "Block M-106" },
          { id: "578", name: "Block M-107" },
          { id: "579", name: "Block M-108" },
          { id: "580", name: "Block M-109" },
          { id: "581", name: "Block M-110" }),
        ],
      },
      {
        id: "90",
        name: "Block N",
        childOptions: [
          ({ id: "370", name: "Block N-800" },
          { id: "371", name: "Block N-801" },
          { id: "372", name: "Block N-802" },
          { id: "886", name: "Block N-101" },
          { id: "887", name: "Block N-102" },
          { id: "888", name: "Block N-103" },
          { id: "889", name: "Block N-104" },
          { id: "890", name: "Block N-105" },
          { id: "891", name: "Block N-106" },
          { id: "900", name: "Block N-803" }),
        ],
      },
      {
        id: "91",
        name: "Block O",
        childOptions: [
          ({ id: "373", name: "Block O-900" },
          { id: "374", name: "Block O-901" },
          { id: "375", name: "Block O-902" },
          { id: "1032", name: "Block O-101" },
          { id: "1033", name: "Block O-102" },
          { id: "1034", name: "Block O-103" },
          { id: "1035", name: "Block O-104" },
          { id: "1036", name: "Block O-105" },
          { id: "1037", name: "Block O-106" },
          { id: "1085", name: "Block O-107" },
          { id: "1086", name: "Block O-108" },
          { id: "1087", name: "Block O-109" },
          { id: "1188", name: "Block O-903" },
          { id: "1390", name: "Block O-904" },
          { id: "2380", name: "Block O-905" },
          { id: "2381", name: "Block O-906" },
          { id: "2382", name: "Block O-907" },
          { id: "2387", name: "Block O-908" },
          { id: "2388", name: "Block O-909" },
          { id: "2389", name: "Block O-910" },
          { id: "2390", name: "Block O-911" },
          { id: "2409", name: "Block O-912" },
          { id: "2410", name: "Block O-913" },
          { id: "2411", name: "Block O-914" }),
        ],
      },
      {
        id: "92",
        name: "MVT",
        childOptions: [
          ({ id: "379", name: "MVT-1" },
          { id: "380", name: "MVT-2" },
          { id: "381", name: "MVT-3" },
          { id: "382", name: "MVT-4" },
          { id: "383", name: "MVT-5" },
          { id: "384", name: "MVT-6" },
          { id: "385", name: "MVT-7" },
          { id: "386", name: "MVT-8" },
          { id: "387", name: "MVT-9" },
          { id: "388", name: "MVT-10" },
          { id: "389", name: "MVT-11" },
          { id: "390", name: "MVT-12" },
          { id: "391", name: "MVT-13" },
          { id: "392", name: "MVT-14" },
          { id: "393", name: "MVT-15" },
          { id: "394", name: "MVT-16" },
          { id: "395", name: "MVT-17" },
          { id: "396", name: "MVT-18" },
          { id: "397", name: "MVT-19" },
          { id: "398", name: "MVT-20" },
          { id: "399", name: "MVT-21" },
          { id: "400", name: "MVT-22" }),
        ],
      },
      {
        id: "97",
        name: "UBR",
        childOptions: [
          ({ id: "519", name: "UBR-100" },
          { id: "520", name: "UBR-101" },
          { id: "521", name: "UBR-102" },
          { id: "522", name: "UBR-103" },
          { id: "523", name: "UBR-201" },
          { id: "524", name: "UBR-202" },
          { id: "525", name: "UBR-203" },
          { id: "526", name: "UBR-204" },
          { id: "601", name: "UBR-205" },
          { id: "642", name: "UBR-301" },
          { id: "643", name: "UBR-302" },
          { id: "644", name: "UBR-303" },
          { id: "645", name: "UBR-304" },
          { id: "646", name: "UBR-305" },
          { id: "647", name: "UBR-306" },
          { id: "892", name: "UBR-401" },
          { id: "893", name: "UBR-402" },
          { id: "894", name: "UBR-403" },
          { id: "895", name: "UBR-404" },
          { id: "896", name: "UBR-405" },
          { id: "897", name: "UBR-406" },
          { id: "898", name: "UBR-407" },
          { id: "899", name: "UBR-408" }),
        ],
      },
      {
        id: "104",
        name: "MVT281022",
        childOptions: [
          { id: "567", name: "MVT281022-100" },
          { id: "568", name: "MVT281022-101" },
          { id: "569", name: "MVT281022-102" },
          { id: "570", name: "MVT281022-103" },
          { id: "571", name: "MVT281022-104" },
        ],
      },
      {
        id: "114",
        name: "qa rental 1",
        childOptions: [
          { id: "661", name: "qa rental 1-100" },
          { id: "662", name: "qa rental 1-101" },
          { id: "1178", name: "qa rental 1-102" },
        ],
      },
      {
        id: "117",
        name: "QA1 Rental",
        childOptions: [{ id: "665", name: "QA1 Rental-Unit 1" }],
      },
      {
        id: "132",
        name: "001 Refundy",
        childOptions: [
          ({ id: "756", name: "001 Refundy-2" },
          { id: "879", name: "001 Refundy-A" },
          { id: "880", name: "001 Refundy-B" },
          { id: "881", name: "001 Refundy-C" },
          { id: "1771", name: "001 Refundy-rajivtest12" },
          { id: "1772", name: "001 Refundy-rajivtest08feb" },
          { id: "1779", name: "001 Refundy-rajivtest09feb2024" },
          { id: "2020", name: "001 Refundy-asdasd" },
          { id: "2021", name: "001 Refundy-avish" },
          { id: "2023", name: "001 Refundy-andd" },
          { id: "2024", name: "001 Refundy-andd" },
          { id: "2029", name: "001 Refundy-andd" },
          { id: "2034", name: "001 Refundy-avish" },
          { id: "2035", name: "001 Refundy-avish" },
          { id: "2036", name: "001 Refundy-avish2" },
          { id: "2037", name: "001 Refundy-avish3" },
          { id: "2038", name: "001 Refundy-avish4" },
          { id: "2039", name: "001 Refundy-avish5" },
          { id: "2040", name: "001 Refundy-avish" },
          { id: "2041", name: "001 Refundy-avish2" },
          { id: "2042", name: "001 Refundy-avish3" },
          { id: "2043", name: "001 Refundy-avish4" },
          { id: "2044", name: "001 Refundy-avish5" },
          { id: "2045", name: "001 Refundy-avish1" },
          { id: "2046", name: "001 Refundy-avish21" },
          { id: "2047", name: "001 Refundy-avish31" },
          { id: "2048", name: "001 Refundy-avish41" },
          { id: "2049", name: "001 Refundy-avish51" },
          { id: "2050", name: "001 Refundy-avish1" },
          { id: "2051", name: "001 Refundy-avish21" },
          { id: "2052", name: "001 Refundy-avish31" },
          { id: "2053", name: "001 Refundy-avish41" },
          { id: "2054", name: "001 Refundy-avish51" },
          { id: "2055", name: "001 Refundy-avish1" },
          { id: "2056", name: "001 Refundy-avish21" },
          { id: "2057", name: "001 Refundy-avish31" },
          { id: "2058", name: "001 Refundy-avish41" },
          { id: "2059", name: "001 Refundy-avish51" },
          { id: "2060", name: "001 Refundy-avish1" },
          { id: "2061", name: "001 Refundy-avish21" },
          { id: "2062", name: "001 Refundy-avish31" },
          { id: "2063", name: "001 Refundy-avish41" },
          { id: "2064", name: "001 Refundy-avish51" },
          { id: "2065", name: "001 Refundy-avish1" },
          { id: "2066", name: "001 Refundy-avish21" },
          { id: "2067", name: "001 Refundy-avish31" },
          { id: "2068", name: "001 Refundy-avish41" },
          { id: "2069", name: "001 Refundy-avish51" },
          { id: "2070", name: "001 Refundy-avish1" },
          { id: "2071", name: "001 Refundy-avish21" },
          { id: "2072", name: "001 Refundy-avish31" },
          { id: "2073", name: "001 Refundy-avish41" },
          { id: "2074", name: "001 Refundy-avish51" },
          { id: "2075", name: "001 Refundy-avish1" },
          { id: "2076", name: "001 Refundy-avish21" },
          { id: "2077", name: "001 Refundy-avish31" },
          { id: "2078", name: "001 Refundy-avish41" },
          { id: "2079", name: "001 Refundy-avish51" },
          { id: "2080", name: "001 Refundy-avish1" },
          { id: "2081", name: "001 Refundy-avish21" },
          { id: "2082", name: "001 Refundy-avish31" },
          { id: "2083", name: "001 Refundy-avish41" },
          { id: "2084", name: "001 Refundy-avish51" },
          { id: "2085", name: "001 Refundy-avish1" },
          { id: "2086", name: "001 Refundy-avish21" },
          { id: "2087", name: "001 Refundy-avish31" },
          { id: "2088", name: "001 Refundy-avish41" },
          { id: "2089", name: "001 Refundy-avish51" },
          { id: "2090", name: "001 Refundy-avish1" },
          { id: "2091", name: "001 Refundy-avish21" },
          { id: "2092", name: "001 Refundy-avish31" },
          { id: "2093", name: "001 Refundy-avish41" },
          { id: "2094", name: "001 Refundy-avish51" },
          { id: "2095", name: "001 Refundy-avish1" },
          { id: "2096", name: "001 Refundy-avish21" },
          { id: "2097", name: "001 Refundy-avish31" },
          { id: "2098", name: "001 Refundy-avish41" },
          { id: "2099", name: "001 Refundy-avish51" },
          { id: "2100", name: "001 Refundy-avish1" },
          { id: "2101", name: "001 Refundy-avish21" },
          { id: "2102", name: "001 Refundy-avish31" },
          { id: "2103", name: "001 Refundy-avish41" },
          { id: "2104", name: "001 Refundy-avish51" },
          { id: "2105", name: "001 Refundy-avish1" },
          { id: "2106", name: "001 Refundy-avish21" },
          { id: "2107", name: "001 Refundy-avish31" },
          { id: "2108", name: "001 Refundy-avish41" },
          { id: "2109", name: "001 Refundy-avish51" },
          { id: "2116", name: "001 Refundy-rajivtest523" },
          { id: "2267", name: "001 Refundy-880" },
          { id: "2399", name: "001 Refundy-inactive1" },
          { id: "2400", name: "001 Refundy-inactive2" },
          { id: "2417", name: "001 Refundy-756" }),
        ],
      },
      {
        id: "137",
        name: "QA test 1",
        childOptions: [
          { id: "761", name: "QA test 1-unit a" },
          { id: "762", name: "QA test 1-unit b" },
          { id: "763", name: "QA test 1-unit c" },
        ],
      },
      {
        id: "139",
        name: "VIJ",
        childOptions: [
          { id: "768", name: "VIJ-Er1" },
          { id: "769", name: "VIJ-Er2" },
          { id: "770", name: "VIJ-Er3" },
        ],
      },
      {
        id: "144",
        name: "ZZ",
        childOptions: [
          ({ id: "804", name: "ZZ-U-1" },
          { id: "805", name: "ZZ-U-2" },
          { id: "806", name: "ZZ-U-3" },
          { id: "901", name: "ZZ-4" },
          { id: "902", name: "ZZ-5" },
          { id: "2418", name: "ZZ-806" }),
        ],
      },
      {
        id: "145",
        name: "IronMan",
        childOptions: [
          { id: "801", name: "IronMan-A-1" },
          { id: "802", name: "IronMan-A-2" },
          { id: "803", name: "IronMan-A-3" },
          { id: "2439", name: "IronMan-802" },
        ],
      },
      {
        id: "165",
        name: "Helo-Brigade",
        childOptions: [
          { id: "876", name: "Helo-Brigade-A" },
          { id: "877", name: "Helo-Brigade-B" },
          { id: "878", name: "Helo-Brigade-C" },
        ],
      },
      {
        id: "167",
        name: "MOveout",
        childOptions: [
          ({ id: "903", name: "MOveout-1" },
          { id: "904", name: "MOveout-2" },
          { id: "905", name: "MOveout-3" },
          { id: "906", name: "MOveout-4" },
          { id: "907", name: "MOveout-5" },
          { id: "908", name: "MOveout-6" },
          { id: "909", name: "MOveout-7" }),
        ],
      },
      {
        id: "169",
        name: "ERVIJ",
        childOptions: [
          { id: "912", name: "ERVIJ-UNIT-1" },
          { id: "913", name: "ERVIJ-UNIT-2" },
          { id: "914", name: "ERVIJ-UNIT-3" },
        ],
      },
      {
        id: "175",
        name: "20Feb23 test block",
        childOptions: [
          ({ id: "947", name: "20Feb23 test block-100" },
          { id: "948", name: "20Feb23 test block-101" },
          { id: "2173", name: "20Feb23 test block-1" },
          { id: "2174", name: "20Feb23 test block-2" },
          { id: "2175", name: "20Feb23 test block-3" },
          { id: "2176", name: "20Feb23 test block-4" }),
        ],
      },
      {
        id: "176",
        name: "Block AB",
        childOptions: [
          ({ id: "949", name: "Block AB-101" },
          { id: "950", name: "Block AB-102" },
          { id: "951", name: "Block AB-1031" },
          { id: "952", name: "Block AB-104" },
          { id: "953", name: "Block AB-105" },
          { id: "1189", name: "Block AB-106" },
          { id: "1190", name: "Block AB-107" },
          { id: "1191", name: "Block AB-108" },
          { id: "1368", name: "Block AB-109" },
          { id: "1370", name: "Block AB-110" },
          { id: "1386", name: "Block AB-111" },
          { id: "2032", name: "Block AB-andd" }),
        ],
      },
      {
        id: "193",
        name: "BC Test1",
        childOptions: [
          { id: "1002", name: "BC Test1-1" },
          { id: "1003", name: "BC Test1-2" },
        ],
      },
      {
        id: "194",
        name: "BC Test2",
        childOptions: [
          { id: "1004", name: "BC Test2-1" },
          { id: "1005", name: "BC Test2-2" },
          { id: "2025", name: "BC Test2-andd" },
          { id: "2030", name: "BC Test2-andd" },
        ],
      },
      {
        id: "205",
        name: "Block X",
        childOptions: [
          { id: "1042", name: "Block X-X1" },
          { id: "1043", name: "Block X-X2" },
          { id: "1044", name: "Block X-X3" },
          { id: "1045", name: "Block X-X4" },
          { id: "1046", name: "Block X-X5" },
        ],
      },
      {
        id: "206",
        name: "Block A111",
        childOptions: [
          { id: "1047", name: "Block A111-a100" },
          { id: "1048", name: "Block A111-a101" },
          { id: "1049", name: "Block A111-a102" },
        ],
      },
      {
        id: "208",
        name: "move in",
        childOptions: [
          { id: "1060", name: "move in-MI 101" },
          { id: "1061", name: "move in-MI102" },
          { id: "1062", name: "move in-MI103" },
          { id: "1063", name: "move in-MI 104" },
        ],
      },
      {
        id: "260",
        name: "mohit",
        childOptions: [
          { id: "1224", name: "mohit-test1" },
          { id: "1225", name: "mohit-test 2" },
        ],
      },
      {
        id: "263",
        name: "DESIGN TEAM",
        childOptions: [
          ({ id: "1230", name: "DESIGN TEAM-1" },
          { id: "1231", name: "DESIGN TEAM-2" },
          { id: "1232", name: "DESIGN TEAM-3" },
          { id: "1233", name: "DESIGN TEAM-4" },
          { id: "1234", name: "DESIGN TEAM-5" },
          { id: "1235", name: "DESIGN TEAM-6" },
          { id: "1236", name: "DESIGN TEAM-7" },
          { id: "1237", name: "DESIGN TEAM-8" },
          { id: "1238", name: "DESIGN TEAM-9" },
          { id: "1239", name: "DESIGN TEAM-11" },
          { id: "1240", name: "DESIGN TEAM-22" },
          { id: "1241", name: "DESIGN TEAM-33" },
          { id: "1242", name: "DESIGN TEAM-44" },
          { id: "1243", name: "DESIGN TEAM-55" },
          { id: "1244", name: "DESIGN TEAM-66" },
          { id: "1245", name: "DESIGN TEAM-77" },
          { id: "1246", name: "DESIGN TEAM-88" },
          { id: "1247", name: "DESIGN TEAM-99" }),
        ],
      },
      {
        id: "277",
        name: "Block $%%",
        childOptions: [{ id: "1300", name: "Block $%%-Uni 7&" }],
      },
      {
        id: "281",
        name: "NJJ",
        childOptions: [
          { id: "1371", name: "NJJ-NJ1" },
          { id: "1372", name: "NJJ-NJ2" },
        ],
      },
      {
        id: "284",
        name: "20JULY",
        childOptions: [
          ({ id: "1381", name: "20JULY-SB11" },
          { id: "1382", name: "20JULY-SB22" },
          { id: "1383", name: "20JULY-SB33" },
          { id: "2110", name: "20JULY-101" },
          { id: "2111", name: "20JULY-102" },
          { id: "2149", name: "20JULY-103" }),
        ],
      },
      {
        id: "306",
        name: "Chat Gaurav",
        childOptions: [
          { id: "1477", name: "Chat Gaurav-G1" },
          { id: "1478", name: "Chat Gaurav-G2" },
          { id: "1479", name: "Chat Gaurav-G3" },
        ],
      },
      {
        id: "311",
        name: "JS-Block",
        childOptions: [
          { id: "1493", name: "JS-Block-JS-1" },
          { id: "1494", name: "JS-Block-JS-2" },
        ],
      },
      {
        id: "313",
        name: "Helo-Block",
        childOptions: [
          { id: "1500", name: "Helo-Block-1" },
          { id: "1501", name: "Helo-Block-2" },
        ],
      },
      {
        id: "323",
        name: "E-Invoice Test",
        childOptions: [
          { id: "1541", name: "E-Invoice Test-E-1" },
          { id: "1542", name: "E-Invoice Test-E-2" },
        ],
      },
      {
        id: "345",
        name: "Helo-API",
        childOptions: [{ id: "1578", name: "Helo-API-Pre" }],
      },
      {
        id: "352",
        name: "30_oct",
        childOptions: [
          ({ id: "1588", name: "30_oct-101" },
          { id: "1589", name: "30_oct-102" },
          { id: "1590", name: "30_oct-103" },
          { id: "1591", name: "30_oct-104" },
          { id: "2199", name: "30_oct-105" },
          { id: "2200", name: "30_oct-106" },
          { id: "2201", name: "30_oct-107" },
          { id: "2202", name: "30_oct-108" }),
        ],
      },
      { id: "363", name: "Jan 17", childOptions: [] },
      {
        id: "368",
        name: "Block ABC",
        childOptions: [
          { id: "1731", name: "Block ABC-101" },
          { id: "1780", name: "Block ABC-102" },
          { id: "1781", name: "Block ABC-103" },
          { id: "1782", name: "Block ABC-104" },
        ],
      },
      { id: "369", name: "check block", childOptions: [] },
      { id: "373", name: "check block 4", childOptions: [] },
      { id: "374", name: "check block 5", childOptions: [] },
      { id: "377", name: "check block 6", childOptions: [] },
      {
        id: "380",
        name: "ANAROCK",
        childOptions: [
          { id: "1783", name: "ANAROCK-101" },
          { id: "1784", name: "ANAROCK-Rajitha anarock 1" },
        ],
      },
      { id: "382", name: "ACB", childOptions: [] },
      {
        id: "387",
        name: "FEB 16",
        childOptions: [{ id: "1903", name: "FEB 16-Rajitha acb45" }],
      },
      {
        id: "389",
        name: "Block FIX",
        childOptions: [{ id: "1907", name: "Block FIX-Rajitha acb47" }],
      },
      { id: "390", name: "FIX 2", childOptions: [] },
      {
        id: "391",
        name: "AC",
        childOptions: [
          { id: "1935", name: "AC-101" },
          { id: "1975", name: "AC-102" },
          { id: "1976", name: "AC-103" },
          { id: "2430", name: "AC-1976" },
        ],
      },
      { id: "392", name: "AC BC TEST", childOptions: [] },
      { id: "393", name: "MAF BLOCK", childOptions: [] },
      {
        id: "414",
        name: "ketan",
        childOptions: [
          ({ id: "2179", name: "ketan-1" },
          { id: "2180", name: "ketan-2" },
          { id: "2181", name: "ketan-3" },
          { id: "2182", name: "ketan-4" },
          { id: "2183", name: "ketan-5" },
          { id: "2184", name: "ketan-6" },
          { id: "2185", name: "ketan-7" },
          { id: "2186", name: "ketan-8" },
          { id: "2187", name: "ketan-9" }),
        ],
      },
      {
        id: "423",
        name: "TestBlock",
        childOptions: [
          { id: "2210", name: "TestBlock-001X" },
          { id: "2211", name: "TestBlock-002X" },
          { id: "2212", name: "TestBlock-003X" },
          { id: "2213", name: "TestBlock-004X" },
        ],
      },
      {
        id: "424",
        name: "Aaditya MAF BC Test1",
        childOptions: [
          ({ id: "2214", name: "Aaditya MAF BC Test1-MAF_U-1" },
          { id: "2215", name: "Aaditya MAF BC Test1-MAF_U-2" },
          { id: "2216", name: "Aaditya MAF BC Test1-MAF_U-3" },
          { id: "2217", name: "Aaditya MAF BC Test1-MAF_U-4" },
          { id: "2218", name: "Aaditya MAF BC Test1-MAF_U-5" },
          { id: "2219", name: "Aaditya MAF BC Test1-MAF_U-6" },
          { id: "2220", name: "Aaditya MAF BC Test1-MAF_U-7" },
          { id: "2221", name: "Aaditya MAF BC Test1-MAF_U-8" },
          { id: "2222", name: "Aaditya MAF BC Test1-MAF_U-9" },
          { id: "2223", name: "Aaditya MAF BC Test1-MAF_U-10" },
          { id: "2224", name: "Aaditya MAF BC Test1-MAF_U-13" },
          { id: "2225", name: "Aaditya MAF BC Test1-MAF_U-11" },
          { id: "2226", name: "Aaditya MAF BC Test1-MAF_U-12" }),
        ],
      },
      {
        id: "425",
        name: "Aaditya MAF BC Test2",
        childOptions: [],
      },
      {
        id: "426",
        name: "Aaditya MAF BC Test3",
        childOptions: [],
      },
      {
        id: "427",
        name: "Aaditya MAF BC Test4",
        childOptions: [],
      },
      {
        id: "428",
        name: "Aaditya MAF BC Test5",
        childOptions: [],
      },
      {
        id: "445",
        name: "Aaditya0107",
        childOptions: [
          { id: "2305", name: "Aaditya0107-Unit-1" },
          { id: "2306", name: "Aaditya0107-Unit-2" },
          { id: "2307", name: "Aaditya0107-Unit-3" },
          { id: "2308", name: "Aaditya0107-Unit-4" },
          { id: "2309", name: "Aaditya0107-Unit-5" },
        ],
      },
      {
        id: "448",
        name: "March test block",
        childOptions: [
          { id: "2319", name: "March test block-100" },
          { id: "2320", name: "March test block-101" },
          { id: "2321", name: "March test block-102" },
        ],
      },
      {
        id: "454",
        name: "BLN-1",
        childOptions: [
          { id: "2337", name: "BLN-1-U-1" },
          { id: "2338", name: "BLN-1-U-2" },
          { id: "2339", name: "BLN-1-U-3" },
          { id: "2340", name: "BLN-1-U-4" },
          { id: "2341", name: "BLN-1-U-5" },
        ],
      },
      {
        id: "455",
        name: "BLN-2",
        childOptions: [
          ({ id: "2342", name: "BLN-2-U-1" },
          { id: "2343", name: "BLN-2-U-2" },
          { id: "2344", name: "BLN-2-U-3" },
          { id: "2345", name: "BLN-2-U-4" },
          { id: "2346", name: "BLN-2-U-5" },
          { id: "2431", name: "BLN-2-2343" }),
        ],
      },
      {
        id: "456",
        name: "BLN-3",
        childOptions: [
          { id: "2347", name: "BLN-3-U-1" },
          { id: "2348", name: "BLN-3-U-2" },
          { id: "2349", name: "BLN-3-U-3" },
          { id: "2350", name: "BLN-3-U-4" },
          { id: "2351", name: "BLN-3-U-5" },
        ],
      },
      {
        id: "462",
        name: "26aug test block ac",
        childOptions: [
          { id: "2395", name: "26aug test block ac-a" },
          { id: "2396", name: "26aug test block ac-b" },
          { id: "2397", name: "26aug test block ac-c" },
          { id: "2440", name: "26aug test block ac-2395" },
        ],
      },
      {
        id: "465",
        name: "30aug test new block",
        childOptions: [
          { id: "2414", name: "30aug test new block-600" },
          { id: "2415", name: "30aug test new block-601" },
        ],
      },
      {
        id: "467",
        name: "1111 sep test block",
        childOptions: [
          { id: "2424", name: "1111 sep test block-100" },
          { id: "2425", name: "1111 sep test block-101" },
        ],
      },
      {
        id: "468",
        name: "May block after fix",
        childOptions: [
          { id: "2426", name: "May block after fix-501" },
          { id: "2427", name: "May block after fix-502" },
          { id: "2428", name: "May block after fix-503" },
        ],
      },
      {
        id: "472",
        name: "Mahadev-10",
        childOptions: [
          { id: "2437", name: "Mahadev-10-M1" },
          { id: "2438", name: "Mahadev-10-M2" },
        ],
      }),
    ],
  },
  {
    id: "7",
    name: "Kohinoor",
    subOptions: [
      ({
        id: "16",
        name: "Block A",
        childOptions: [
          { id: "61", name: "Block A-101" },
          { id: "62", name: "Block A-102" },
          { id: "63", name: "Block A-103" },
          { id: "64", name: "Block A-104" },
          { id: "65", name: "Block A-105" },
        ],
      },
      {
        id: "17",
        name: "Block B",
        childOptions: [
          { id: "66", name: "Block B-201" },
          { id: "67", name: "Block B-202" },
          { id: "68", name: "Block B-203" },
          { id: "69", name: "Block B-204" },
          { id: "70", name: "Block B-205" },
        ],
      },
      {
        id: "18",
        name: "Block C",
        childOptions: [
          { id: "71", name: "Block C-301" },
          { id: "72", name: "Block C-302" },
          { id: "73", name: "Block C-303" },
          { id: "74", name: "Block C-304" },
          { id: "75", name: "Block C-305" },
        ],
      },
      {
        id: "19",
        name: "Block D",
        childOptions: [
          ({ id: "76", name: "Block D-401" },
          { id: "77", name: "Block D-402" },
          { id: "78", name: "Block D-403" },
          { id: "79", name: "Block D-404" },
          { id: "80", name: "Block D-405" },
          { id: "1055", name: "Block D-501" },
          { id: "1056", name: "Block D-502" },
          { id: "1057", name: "Block D-503" },
          { id: "1058", name: "Block D-504" },
          { id: "1059", name: "Block D-505" },
          { id: "1084", name: "Block D-506" }),
        ],
      },
      {
        id: "21",
        name: "Block G",
        childOptions: [
          ({ id: "82", name: "Block G-G1" },
          { id: "83", name: "Block G-G2" },
          { id: "84", name: "Block G-G3" },
          { id: "85", name: "Block G-G4" },
          { id: "93", name: "Block G-100" },
          { id: "94", name: "Block G-101" },
          { id: "469", name: "Block G-G5" },
          { id: "470", name: "Block G-G6" },
          { id: "471", name: "Block G-G7" },
          { id: "472", name: "Block G-G8" },
          { id: "1088", name: "Block G-201" },
          { id: "1089", name: "Block G-202" },
          { id: "1090", name: "Block G-203" },
          { id: "1108", name: "Block G-205" }),
        ],
      },
      {
        id: "172",
        name: "15 feb AC move in",
        childOptions: [
          ({ id: "928", name: "15 feb AC move in-A" },
          { id: "929", name: "15 feb AC move in-B" },
          { id: "930", name: "15 feb AC move in-C" },
          { id: "931", name: "15 feb AC move in-D" },
          { id: "932", name: "15 feb AC move in-E" },
          { id: "933", name: "15 feb AC move in-F" },
          { id: "934", name: "15 feb AC move in-G" },
          { id: "935", name: "15 feb AC move in-H" },
          { id: "936", name: "15 feb AC move in-I" },
          { id: "937", name: "15 feb AC move in-J" },
          { id: "938", name: "15 feb AC move in-K" },
          { id: "939", name: "15 feb AC move in-L" },
          { id: "940", name: "15 feb AC move in-M" },
          { id: "941", name: "15 feb AC move in-N" },
          { id: "1226", name: "15 feb AC move in-1000" }),
        ],
      },
      {
        id: "353",
        name: "Block E",
        childOptions: [
          { id: "1592", name: "Block E-101" },
          { id: "1593", name: "Block E-102" },
          { id: "1594", name: "Block E-103" },
        ],
      },
      {
        id: "419",
        name: "Tower A",
        childOptions: [
          { id: "2197", name: "Tower A-1001" },
          { id: "2198", name: "Tower A-1002" },
        ],
      }),
    ],
  },
  {
    id: "9",
    name: "Payu smart Comm",
    subOptions: [
      {
        id: "24",
        name: "Block-A",
        childOptions: [
          { id: "91", name: "Block-A-Unit-1" },
          { id: "92", name: "Block-A-Unit-2" },
        ],
      },
      {
        id: "163",
        name: "Block G",
        childOptions: [
          { id: "871", name: "Block G-G1" },
          { id: "872", name: "Block G-G2" },
          { id: "873", name: "Block G-G3" },
          { id: "874", name: "Block G-G4" },
          { id: "875", name: "Block G-G5" },
        ],
      },
      { id: "164", name: "Block B", childOptions: [] },
      {
        id: "226",
        name: "Block-Z",
        childOptions: [
          { id: "1139", name: "Block-Z-new unit1" },
          { id: "1143", name: "Block-Z-test1" },
        ],
      },
    ],
  },
  {
    id: "10",
    name: "Chat Community 2207",
    subOptions: [
      ({
        id: "30",
        name: "Edited Block Name",
        childOptions: [
          { id: "110", name: "Edited Block Name-1" },
          { id: "111", name: "Edited Block Name-2" },
        ],
      },
      {
        id: "31",
        name: "B",
        childOptions: [
          { id: "112", name: "B-3" },
          { id: "113", name: "B-4" },
        ],
      },
      {
        id: "32",
        name: "C",
        childOptions: [
          { id: "114", name: "C-5" },
          { id: "115", name: "C-6" },
        ],
      },
      {
        id: "33",
        name: "D",
        childOptions: [
          { id: "116", name: "D-7" },
          { id: "117", name: "D-8" },
        ],
      },
      {
        id: "34",
        name: "E",
        childOptions: [
          { id: "118", name: "E-9" },
          { id: "119", name: "E-10" },
        ],
      },
      {
        id: "44",
        name: "New Block /updated",
        childOptions: [
          { id: "123", name: "New Block /updated-1" },
          { id: "124", name: "New Block /updated-2" },
          { id: "125", name: "New Block /updated-3" },
        ],
      },
      { id: "45", name: "Test 1", childOptions: [] },
      {
        id: "118",
        name: "QA1 Rental1",
        childOptions: [{ id: "666", name: "QA1 Rental1-Unit 1" }],
      },
      {
        id: "119",
        name: "New",
        childOptions: [
          { id: "667", name: "New-101" },
          { id: "668", name: "New-102" },
          { id: "669", name: "New-103" },
          { id: "670", name: "New-104" },
          { id: "671", name: "New-105" },
        ],
      }),
    ],
  },
  {
    id: "11",
    name: "Sep 29 UAE community",
    subOptions: [
      ({
        id: "57",
        name: "Block A",
        childOptions: [
          ({ id: "224", name: "Block A-101" },
          { id: "1256", name: "Block A-102" },
          { id: "1257", name: "Block A-103" },
          { id: "1495", name: "Block A-104" },
          { id: "1496", name: "Block A-105" },
          { id: "1497", name: "Block A-106" },
          { id: "1498", name: "Block A-107" },
          { id: "1509", name: "Block A-108" },
          { id: "1510", name: "Block A-109" },
          { id: "1511", name: "Block A-110" },
          { id: "1512", name: "Block A-111" },
          { id: "1513", name: "Block A-112" }),
        ],
      },
      {
        id: "58",
        name: "Block B",
        childOptions: [
          { id: "225", name: "Block B-201" },
          { id: "430", name: "Block B-202" },
        ],
      },
      {
        id: "140",
        name: "Block C",
        childOptions: [
          ({ id: "777", name: "Block C-101" },
          { id: "778", name: "Block C-102" },
          { id: "779", name: "Block C-103" },
          { id: "780", name: "Block C-104" },
          { id: "781", name: "Block C-105" },
          { id: "782", name: "Block C-106" },
          { id: "783", name: "Block C-107" },
          { id: "784", name: "Block C-108" },
          { id: "785", name: "Block C-109" },
          { id: "786", name: "Block C-110" },
          { id: "1438", name: "Block C-111" },
          { id: "1503", name: "Block C-112" },
          { id: "1504", name: "Block C-113" },
          { id: "1505", name: "Block C-114" },
          { id: "1506", name: "Block C-115" },
          { id: "1507", name: "Block C-116" },
          { id: "1508", name: "Block C-117" }),
        ],
      },
      {
        id: "267",
        name: "G",
        childOptions: [
          ({ id: "1260", name: "G-1" },
          { id: "1261", name: "G-2" },
          { id: "1262", name: "G-3" },
          { id: "1263", name: "G-4" },
          { id: "1264", name: "G-5" },
          { id: "1265", name: "G-6" }),
        ],
      },
      {
        id: "268",
        name: "H",
        childOptions: [
          ({ id: "1266", name: "H-1" },
          { id: "1267", name: "H-2" },
          { id: "1268", name: "H-3" },
          { id: "1269", name: "H-4" },
          { id: "1270", name: "H-5" },
          { id: "1271", name: "H-6" }),
        ],
      },
      {
        id: "269",
        name: "I",
        childOptions: [
          ({ id: "1272", name: "I-1" },
          { id: "1273", name: "I-2" },
          { id: "1274", name: "I-3" },
          { id: "1275", name: "I-4" },
          { id: "1276", name: "I-5" },
          { id: "1277", name: "I-6" }),
        ],
      },
      {
        id: "270",
        name: "A",
        childOptions: [
          ({ id: "1278", name: "A-1" },
          { id: "1279", name: "A-2" },
          { id: "1280", name: "A-3" },
          { id: "1281", name: "A-4" },
          { id: "1282", name: "A-5" },
          { id: "1463", name: "A-6" },
          { id: "1464", name: "A-7" },
          { id: "1465", name: "A-8" },
          { id: "1466", name: "A-9" },
          { id: "1468", name: "A-10" }),
        ],
      },
      {
        id: "271",
        name: "B",
        childOptions: [
          ({ id: "1283", name: "B-2" },
          { id: "1284", name: "B-3" },
          { id: "1285", name: "B-4" },
          { id: "1286", name: "B-5" },
          { id: "1436", name: "B-6" },
          { id: "1437", name: "B-7" }),
        ],
      },
      {
        id: "272",
        name: "C",
        childOptions: [
          { id: "1287", name: "C-3" },
          { id: "1288", name: "C-4" },
          { id: "1289", name: "C-5" },
          { id: "1290", name: "C-6" },
        ],
      },
      {
        id: "273",
        name: "D",
        childOptions: [
          { id: "1291", name: "D-5" },
          { id: "1292", name: "D-6" },
        ],
      },
      {
        id: "274",
        name: "E",
        childOptions: [
          { id: "1293", name: "E-6" },
          { id: "1294", name: "E-7" },
        ],
      },
      {
        id: "282",
        name: "VIJ",
        childOptions: [{ id: "1439", name: "VIJ-101" }],
      },
      { id: "298", name: "New MVT", childOptions: [] },
      {
        id: "302",
        name: "Move",
        childOptions: [
          ({ id: "1448", name: "Move-M1" },
          { id: "1449", name: "Move-M2" },
          { id: "1450", name: "Move-M3" },
          { id: "1451", name: "Move-M4" },
          { id: "1457", name: "Move-MV8" },
          { id: "1458", name: "Move-MV9" },
          { id: "1459", name: "Move-MV81" },
          { id: "1460", name: "Move-MV82" },
          { id: "1462", name: "Move-MV83" }),
        ],
      },
      {
        id: "305",
        name: "GG",
        childOptions: [
          { id: "1470", name: "GG-T1" },
          { id: "1471", name: "GG-T2" },
        ],
      },
      { id: "307", name: "test ro", childOptions: [] },
      {
        id: "309",
        name: "Block G",
        childOptions: [
          ({ id: "1487", name: "Block G-101" },
          { id: "1488", name: "Block G-102" },
          { id: "1489", name: "Block G-103" },
          { id: "1490", name: "Block G-104" },
          { id: "1491", name: "Block G-105" },
          { id: "2131", name: "Block G-106" },
          { id: "2132", name: "Block G-107" },
          { id: "2133", name: "Block G-108" },
          { id: "2134", name: "Block G-109" }),
        ],
      },
      {
        id: "399",
        name: "april03 block",
        childOptions: [
          { id: "2128", name: "april03 block-100" },
          { id: "2129", name: "april03 block-101" },
          { id: "2130", name: "april03 block-102" },
        ],
      },
      {
        id: "458",
        name: "aug16 block",
        childOptions: [
          { id: "2359", name: "aug16 block-100" },
          { id: "2360", name: "aug16 block-101" },
          { id: "2361", name: "aug16 block-102" },
        ],
      },
      {
        id: "460",
        name: "Shepherd block",
        childOptions: [
          ({ id: "2374", name: "Shepherd block-300" },
          { id: "2375", name: "Shepherd block-301" },
          { id: "2376", name: "Shepherd block-302" },
          { id: "2377", name: "Shepherd block-303" },
          { id: "2378", name: "Shepherd block-304" },
          { id: "2379", name: "Shepherd block-305" },
          { id: "2391", name: "Shepherd block-306" },
          { id: "2392", name: "Shepherd block-307" },
          { id: "2393", name: "Shepherd block-308" }),
        ],
      }),
    ],
  },
];

const filterChargeable = [
  { label: "All", value: "all" },
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];
const statusOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Rejected", value: "rejected" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Pending", value: "pending" },
  { label: "Canceled", value: "canceled" },
];
const formatDateRangeLabel = (range) => {
  const map = {
    last_7_days: "Last 7 Days",
    current_month: "Current Month",
    last_month: "Last Month",
    custom: "Custom Range",
  };
  return map[range] || "All";
};

function BookingFilter() {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const communityBlockMap = {};

  const [bookingGlobalFilterState, setBookingGlobalFilterState] = useState({
    status: statusOptions?.map((opt) => opt.value),
    date_range: "",
    chargeable: filterChargeable?.map((opt) => opt.value),
    communitySelection: [],
  });

  const handleBookingGlobalFilterChange = (key, newValue) => {
    setBookingGlobalFilterState((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-CA") : "";

  const getUpdatedFiltersBarData = (bookingGlobalFilterState) => {
    const {
      communitySelection = [],
      chargeable,
      status,
      start_date,
      end_date,
      date_range = "current_month",
    } = bookingGlobalFilterState;
    const communityNames = communitySelection.map((c) => c.name);
    const visibleCommunities =
      communityNames.length === 0 ||
      communityNames?.length == Object.entries(communityBlockMap)?.length
        ? "All"
        : communityNames.slice(0, 2).join(", ") +
          (communityNames.length > 2 ? "..." : "");

    const updatedFilters = {
      "Community/ Block/ Unit": visibleCommunities || "All",
      Chargeable:
        !chargeable.length || chargeable.includes("all")
          ? "All"
          : capitalize(chargeable?.[0]),
      "Select Status":
        !status.length || status.includes("all")
          ? "All"
          : status.map((str) => capitalize(str)).join(", "),
      "Select Date Range":
        start_date && end_date && date_range == "custom"
          ? `${formatDate(start_date)} - ${formatDate(end_date)}`
          : formatDateRangeLabel(date_range),
    };

    return updatedFilters;
  };

  const filterDataOptions = {
    Filters: [
      { id: 0, label: "Communities, Blocks, Units", key: "community_ids" },
      { id: 1, label: "Chargeable", key: "chargeable" },
      { id: 2, label: "Status", key: "status" },
      { id: 3, label: "Date Range", key: "date_range" },
    ],
    DateRange: [
      { label: "Last 7 Days", value: "last_7_days" },
      { label: "Current Month", value: "current_month" },
      { label: "Last Month", value: "last_month" },
      { label: "Custom", value: "custom" },
    ],
    Chargeable: [
      { label: "All", value: "all" },
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    // Communities: [
    //   {
    //     id: "2",
    //     name: "Move In Pradise Estate",
    //     subOptions: [
    //       {
    //         id: "4",
    //         name: "Block-1",
    //         childOptions: [
    //           {
    //             id: "10",
    //             name: "Block-1-Unit-1",
    //           },
    //           {
    //             id: "11",
    //             name: "Block-1-Unit2",
    //           },
    //           {
    //             id: "41",
    //             name: "Block-1-No lease",
    //           },
    //           {
    //             id: "1565",
    //             name: "Block-1-Unit 3",
    //           },
    //         ],
    //       },
    //       {
    //         id: "5",
    //         name: "Block A",
    //         childOptions: [
    //           {
    //             id: "12",
    //             name: "Block A-101",
    //           },
    //           {
    //             id: "13",
    //             name: "Block A-102",
    //           },
    //           {
    //             id: "14",
    //             name: "Block A-103",
    //           },
    //           {
    //             id: "15",
    //             name: "Block A-104",
    //           },
    //           {
    //             id: "16",
    //             name: "Block A-105",
    //           },
    //           {
    //             id: "1176",
    //             name: "Block A-106",
    //           },
    //           {
    //             id: "1373",
    //             name: "Block A-107",
    //           },
    //           {
    //             id: "1387",
    //             name: "Block A-108",
    //           },
    //           {
    //             id: "1692",
    //             name: "Block A-Rajitha ab31",
    //           },
    //           {
    //             id: "1693",
    //             name: "Block A-Rajitha ab32",
    //           },
    //           {
    //             id: "2028",
    //             name: "Block A-andd",
    //           },
    //           {
    //             id: "2031",
    //             name: "Block A-andd",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
    Status: statusOptions,
  };

  const filterKeyToTabIndexMap = {
    "Community/ Block/ Unit": 0,
    "Select Status": 2,
    "Select Date Range": 3,
    Chargeable: 1,
    // Add all relevant mappings here
  };

  const handleResetFilters = () => {
    setBookingGlobalFilterState((prev) => ({
      ...prev,
      date_range: "",
      start_date: "",
      end_date: "",
      status: statusOptions?.map((opt) => opt.value),
      chargeable: filterChargeable?.map((opt) => opt.value),
      communitySelection: [],
    }));


    navigate("/facilities", { replace: true });
  };

  const handleApplyFilters = () => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.delete("page");
    // --- Date Range Logic ---
    const today = new Date();
    let startDate = "";
    let endDate = "";

    switch (bookingGlobalFilterState.date_range) {
      case "last_7_days": {
        const past = new Date();
        past.setDate(today.getDate() - 7);
        startDate = past.toISOString().split("T")[0];
        endDate = today.toISOString().split("T")[0];
        break;
      }
      case "current_month": {
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        startDate = start.toISOString().split("T")[0];
        endDate = end.toISOString().split("T")[0];
        break;
      }
      case "last_month": {
        const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const end = new Date(today.getFullYear(), today.getMonth(), 0);
        startDate = start.toISOString().split("T")[0];
        endDate = end.toISOString().split("T")[0];
        break;
      }
      case "custom": {
        startDate = formatDate(globalFilterState?.start_date);
        endDate = formatDate(globalFilterState?.end_date);
        break;
      }
      default:
        break;
    }

    if (bookingGlobalFilterState.date_range) {
      updatedParams.set("date_range", bookingGlobalFilterState.date_range);
    } else {
      updatedParams.delete("date_range");
    }

    if (startDate) updatedParams.set("start_date", startDate);
    else updatedParams.delete("start_date");

    if (endDate) updatedParams.set("end_date", endDate);
    else updatedParams.delete("end_date");

    // First clear all possible status keys
    updatedParams.delete("multi_status");

    const statusApiMap = {
      active: "current",
      rejected: "rejected",
      upcoming: "upcoming",
      pending: "pending", // matches your old mapping
      canceled: "canceled",
    };

    const selectedStatuses = bookingGlobalFilterState.status || [];
    const apiStatusList = selectedStatuses
      .map((label) => statusApiMap[label])
      .filter(Boolean);
    // Get all API values from statusApiMap
    const allStatusApiValues = Object.values(statusApiMap);
    // If not all statuses are selected, set multi_status
    const isAllStatusesSelected =
      apiStatusList.length === allStatusApiValues.length;

    if (apiStatusList.length && !isAllStatusesSelected) {
      updatedParams.set("multi_status", apiStatusList.join(","));
    } else {
      updatedParams.delete("multi_status");
    }

    const allChargeableValues = filterDataOptions.Chargeable.map(
      (v) => v.value
    );

    const selectedChargable = bookingGlobalFilterState.chargeable || [];

    const selectedWithoutAll = selectedChargable.filter((v) => v !== "all");

    const isAllSelected =
      selectedWithoutAll.length === allChargeableValues.length - 1;

    if (selectedChargable.length > 0 && !isAllSelected) {
      updatedParams.set("chargeable", selectedChargable.join(","));
    } else {
      updatedParams.delete("chargeable");
    }

    const selection = bookingGlobalFilterState.communitySelection || [];

    const fullDataMap = {};
    selectorOptions.forEach((community) => {
      fullDataMap[community.id] = {
        blockMap: {},
        blockIds: community.subOptions.map((b) => b.id),
      };

      community.subOptions.forEach((block) => {
        fullDataMap[community.id].blockMap[block.id] = {
          unitIds: block.childOptions?.map((u) => u.id) || [],
        };
      });
    });

    const finalCommunityIds = new Set();
    const finalBlockIds = new Set();
    const finalUnitIds = new Set();

    selection.forEach((selectedCommunity) => {
      const communityId = selectedCommunity.id;
      const selectedBlocks = selectedCommunity.subOptions || [];

      const allBlockIds = fullDataMap[communityId]?.blockIds || [];

      let allBlocksSelected = true;

      selectedBlocks.forEach((selectedBlock) => {
        const blockId = selectedBlock.id;
        const selectedUnits =
          selectedBlock.childOptions?.map((u) => u.id) || [];

        const allUnitIds =
          fullDataMap[communityId]?.blockMap[blockId]?.unitIds || [];

        const allUnitsSelected =
          selectedUnits.length === allUnitIds.length &&
          allUnitIds.every((id) => selectedUnits.includes(id));

        if (allUnitsSelected) {
          finalBlockIds.add(blockId);
        } else {
          selectedUnits.forEach((unitId) => finalUnitIds.add(unitId));
          allBlocksSelected = false;
        }
      });

      const selectedBlockIds = selectedBlocks.map((b) => b.id);
      const isAllBlocksSelected =
        selectedBlockIds.length === allBlockIds.length &&
        allBlockIds.every((id) => selectedBlockIds.includes(id));

      if (isAllBlocksSelected && allBlocksSelected) {
        finalCommunityIds.add(communityId);
        // remove block/unit if entire community is added
        selectedBlocks.forEach((b) => finalBlockIds.delete(b.id));
      }
    });
    // Set or delete based on collected IDs
    if (finalCommunityIds.size) {
      updatedParams.set("community_ids", [...finalCommunityIds].join(","));
    } else {
      updatedParams.delete("community_ids");
    }

    if (finalBlockIds.size) {
      updatedParams.set("block_ids", [...finalBlockIds].join(","));
    } else {
      updatedParams.delete("block_ids");
    }

    if (finalUnitIds.size) {
      updatedParams.set("unit_ids", [...finalUnitIds].join(","));
    } else {
      updatedParams.delete("unit_ids");
    }

    const ROUTE_STATUS_MAP = {
      all: "/notice_board",
      pending: "/pending_for_approval_notices",
      expiring: "/expiring-today",
      expired: "/expired_notices",
      rejected: "/rejected-notices",
    };

    // if (selectedStatuses?.length > 1) {
    //   navigate(`${basePath}/?${updatedParams.toString()}`);
    // } else if (location.pathname !== ROUTE_STATUS_MAP[selectedStatuses[0]]) {
    //   navigate(`${basePath}/?${updatedParams.toString()}`);
    // } else {
    setSearchParams(updatedParams);
    // }
    // setSearchParams(updatedParams);
  };

  const rebuildStructuredFromUrl = (
    ids = [],
    selectorOptions = [],
    type = "unit"
  ) => {
    const structured = [];

    for (const community of selectorOptions) {
      const matchedSubOptions = [];

      for (const block of community.subOptions || []) {
        let matchedUnits = [];

        if (type === "unit") {
          matchedUnits = block.childOptions?.filter((unit) =>
            ids.includes(unit.id.toString())
          );
        }

        const isBlockMatch =
          type === "block" && ids.includes(block.id.toString());

        if ((type === "unit" && matchedUnits?.length) || isBlockMatch) {
          matchedSubOptions.push({
            id: block.id,
            name: block.name,
            childOptions:
              type === "unit" ? matchedUnits : block.childOptions || [],
          });
        }
      }

      const isCommunityMatch =
        type === "community" && ids.includes(community.id.toString());

      if (matchedSubOptions.length || isCommunityMatch) {
        structured.push({
          id: community.id,
          name: community.name,
          subOptions:
            type === "community"
              ? community.subOptions || []
              : matchedSubOptions,
        });
      }
    }

    return structured;
  };

  const statusFromPath = () => {
    const reverseMap = {
      current: "active",
      show_expired: "expired",
      weakly_expired: "expiring",
      show_draft: "draft",
      pending_for_approval_notices: "pending",
      rejected: "rejected",
      upcoming: "upcoming",
    };

    // Priority 1: Infer from path
    if (pathname.includes("upcoming_bookings")) return ["upcoming"];
    if (pathname.includes("expired_notices")) return ["expired"];
    if (pathname.includes("active_bookings")) return ["active"];
    if (pathname.includes("pending_bookings")) return ["pending"];
    if (pathname.includes("expiring-this-week")) return ["expiring"];
    if (pathname.includes("rejected_bookings")) return ["rejected"];

    // Priority 2: Use multi_status param if present
    const urlStatus = (searchParams.get("multi_status") || "")
      .split(",")
      .map((key) => reverseMap[key]) // map keys to actual status values
      .filter(Boolean); // remove undefineds

    if (urlStatus.length > 0) {
      return urlStatus;
    }

    // Fallback: return all status values
    return statusOptions.map((opt) => opt.value);
  };

  useEffect(() => {
    const date_range = searchParams.get("date_range") || "";
    const allStatuses = statusOptions.map((opt) => opt.value); // Add this line
    const allChargeable = filterDataOptions?.Chargeable?.map(
      (opt) => opt.value
    );
    const urlChargeable = (searchParams.get("chargeable") || "")
      .split(",")
      .filter(Boolean);

    const urlStatus = (searchParams.get("multi_status") || "")
      .split(",")
      .filter(Boolean);
    const newState = {
      date_range,
      start_date: searchParams.get("start_date")
        ? new Date(searchParams.get("start_date"))
        : "",
      end_date: searchParams.get("end_date")
        ? new Date(searchParams.get("end_date"))
        : "",
      chargeable: urlChargeable.length ? urlChargeable : allChargeable,
      status: urlStatus.length ? urlStatus : statusFromPath(), // Default if no match
      communitySelection: [], // we'll fill this below
    };

    // ✅ Match status keys to UI-friendly values
    const multiStatus = searchParams.get("multi_status");
    if (multiStatus) {
      const reverseMap = {
        current: "active",
        pending: "pending",
        rejected: "rejected",
        upcoming: "upcoming",
        canceled: "canceled",
      };

      const values = multiStatus
        .split(",")
        .map((s) => reverseMap[s])
        .filter(Boolean);

      if (values.length > 0) {
        newState.status = values;
      }
    }

    // ✅ Fallback for old boolean status params (only if multi_status is missing)
    if (!multiStatus) {
      const urlStatusKeys = [
        "current",
        "show_expired",
        "weakly_expired",
        "show_draft",
        "pending_for_approval_notices",
      ];

      for (const key of urlStatusKeys) {
        if (searchParams.get(key) === "true") {
          const reverseMap = {
            current: "active",
            pending: "pending",
            rejected: "rejected",
            upcoming: "upcoming",
            canceled: "canceled",
          };
          newState.status = [reverseMap[key]];
          break;
        }
      }
    }
    const blockIds = (searchParams.get("block_ids") || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    const unitIds = (searchParams.get("unit_ids") || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    const communityIds = (searchParams.get("community_ids") || "")
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);

    if (selectorOptions.length) {
      const byCommunity =
        communityIds.length > 0
          ? rebuildStructuredFromUrl(communityIds, selectorOptions, "community")
          : [];

      const byBlocks =
        blockIds.length > 0
          ? rebuildStructuredFromUrl(blockIds, selectorOptions, "block")
          : [];

      const byUnits =
        unitIds.length > 0
          ? rebuildStructuredFromUrl(unitIds, selectorOptions, "unit")
          : [];

      const unitIdsInBlocks = new Set();
      byBlocks.forEach((community) =>
        community.subOptions.forEach((block) =>
          block.childOptions.forEach((unit) =>
            unitIdsInBlocks.add(unit.id.toString())
          )
        )
      );

      const merged = JSON.parse(JSON.stringify(byCommunity)); // Start from community selection

      const mergeInto = (source) => {
        source.forEach((srcCommunity) => {
          let targetCommunity = merged.find((c) => c.id === srcCommunity.id);
          if (!targetCommunity) {
            merged.push(srcCommunity);
          } else {
            srcCommunity.subOptions.forEach((srcBlock) => {
              let targetBlock = targetCommunity.subOptions.find(
                (b) => b.id === srcBlock.id
              );
              if (!targetBlock) {
                targetCommunity.subOptions.push(srcBlock);
              } else {
                srcBlock.childOptions.forEach((unit) => {
                  const isAlreadyIn = targetBlock.childOptions.find(
                    (u) => u.id === unit.id
                  );
                  if (!isAlreadyIn) {
                    targetBlock.childOptions.push(unit);
                  }
                });
              }
            });
          }
        });
      };

      mergeInto(byBlocks);
      mergeInto(byUnits);

      newState.communitySelection = merged;
    }

    setBookingGlobalFilterState(newState);
  }, [selectorOptions, searchParams]);

  const shouldShowDot = (key, searchParams) => {
    if (key === "community_ids") {
      const community = searchParams.get("community_ids");
      const block = searchParams.get("block_ids");
      const unit = searchParams.get("unit_ids");

      const values = [community, block, unit].flatMap((param) =>
        param
          ? param
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : []
      );

      return values.length > 0;
    }

    const param = searchParams.get(key);
    const isListKey = ["chargeable"];

    if (isListKey.includes(key)) {
      if (!param) return false;

      return !!param;
    }

    if (key === "status") {
      const param = searchParams.get("status");
      const multiStatus = searchParams.get("multi_status");
      return (param && param !== "all") || !!multiStatus;
    }

    if (key === "date_range") {
      return !!param;
    }

    return false;
  };

  return (
    <div className="mt-6">
      <Accordion
        elevation={0}
        className="border-[0.5px] border-[#EBEBEB] rounded"
        defaultExpanded
        onChange={() => setExpanded((prev) => !prev)}
      >
        <AccordionSummary
          className="bg-[#FAF9FC]! filter-list-notice-board"
          expandIcon={
            <Button
              className="p-2! font-medium! text-[#884EA7]!"
              endIcon={
                expanded ? (
                  <LuChevronUp className="ms-3 filter-up-arrow" />
                ) : (
                  <LuChevronDown className="ms-3 filter-down-arrow" />
                )
              }
            >
              More Filters
            </Button>
            // <div className="flex items-center gap-5">
            //   <p className="font-medium text-[#884EA7]">More Filters</p>
            // </div>
          }
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            "& .MuiAccordionSummary-content": {
              margin: "16px 0",
            },
            "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
              transform: "none", // 🚫 removes rotation
            },
          }}
        >
          <h4 className="font-semibold text-[#4D4D4F]">Filters</h4>
        </AccordionSummary>
        {/* <hr className="text-gray-300" /> */}
        <AccordionDetails className="p-4!">
          <FilterBar
            filters={getUpdatedFiltersBarData(bookingGlobalFilterState)}
            // values={filterValues}
            // onChange={(updated) => {
            //   setFilterValues(updated);
            // }}
            globalFilterState={bookingGlobalFilterState}
            setGlobalFilterState={setBookingGlobalFilterState}
            handleGlobalFilterChange={handleBookingGlobalFilterChange}
            selectorOptions={selectorOptions}
            filterDataOptions={filterDataOptions}
            toggleAllFilters={["chargeable", "status"]}
            handleResetFilters={handleResetFilters}
            handleApplyFilters={handleApplyFilters}
            filterKeyToTabIndexMap={filterKeyToTabIndexMap}
            shouldShowDot={shouldShowDot}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default BookingFilter;
