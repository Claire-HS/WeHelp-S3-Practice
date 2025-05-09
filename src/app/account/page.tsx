"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, Select, Button, Divider, NumberInput } from "@mantine/core";
import Header from "@/component/Header";
import Footer from "@/component/Footer";

type RecordData = {
  id: number;
  type: string | null;
  money: string | number;
  item: string;
  timestamp: string;
};

export default function AccountPage() {
  const [type, setType] = useState<string | null>("");
  const [money, setMoney] = useState<string | number>("");
  const [item, setItem] = useState<string>("");
  const [records, setRecords] = useState<RecordData[]>([]);
  const [recordId, setRecordId] = useState(1);
  const router = useRouter();

  function addRecord() {
    if (!type || !money || !item) {
      alert("請填寫所有欄位！");
      return;
    }
    const newRecord = {
      id: recordId,
      type,
      money,
      item,
      timestamp: new Date().toISOString(),
    };
    setRecords((prev) => [...prev, newRecord]);
    setRecordId(recordId + 1);
  }

  function delRecord(idToDelete: number) {
    setRecords((prev) => prev.filter((record) => record.id !== idToDelete));
  }

  function calculateTotal(records: RecordData[]): number {
    return records.reduce((accumulator, record) => {
      const money = Number(record.money);
      return accumulator + (record.type === "支出" ? -money : money);
    }, 0);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="My Account Book" />
      <div className="flex-grow">
        <div className="flex flex-col mt-[20px] md:flex-row flex-wrap gap-[20px] w-full max-w-[1200px] mx-auto px-4 items-center justify-center">
          <Select
            placeholder="請選擇"
            data={["收入", "支出"]}
            value={type}
            onChange={setType}
            className="w-full md:flex-1"
          />
          <NumberInput
            placeholder="金額"
            allowNegative={false}
            thousandSeparator=","
            value={money}
            onChange={setMoney}
            className="w-full md:flex-1"
          />
          <TextInput
            placeholder="請輸入說明"
            value={item}
            onChange={(event) => setItem(event.currentTarget.value)}
            className="w-full md:flex-1"
          />
          <Button variant="filled" onClick={addRecord}>
            新增紀錄
          </Button>
        </div>

        <Divider my="md" size="xs" className="w-2/3 mx-auto" />

        {/* 顯示紀錄 */}
        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-[20px] md:gap-[10px] md:px-[10px] ">
          {records.length === 0 ? (
            <div className="w-full text-center text-gray-400 py-4">
              尚無紀錄
            </div>
          ) : (
            records.map((record, index) => (
              <div
                key={index}
                className="flex flex-col gap-[5px] md:flex-row md:items-center justify-between pb-2"
              >
                <span className="w-full text-center md: w-2/8">
                  {new Date(record.timestamp).toLocaleString()}
                </span>
                <span
                  className={`w-full text-center font-semibold md:w-2/8 md:text-right ${
                    record.type === "收入" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {record.type === "支出" ? "-" : ""}
                  {Number(record.money).toLocaleString()}
                </span>
                <span className="md:w-3/8 text-center">{record.item}</span>
                <div className="w-full flex justify-center md:w-1/8">
                  <Button
                    color="grey"
                    size="compact-sm"
                    onClick={() => delRecord(record.id)}
                  >
                    刪除
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <Divider my="md" size="xs" className="w-2/3 mx-auto" />

        <div className="text-center font-semibold mb-[20px]">
          小計: {calculateTotal(records).toLocaleString()} 元
        </div>
        <div className="flex justify-center">
          <Button variant="filled" onClick={() => router.push("/")}>
            返回首頁
          </Button>
        </div>
      </div>
      <Footer text="COPYRIGHT @ 2025 WeHelp Practice" />
    </div>
  );
}
