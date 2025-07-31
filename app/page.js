"use client";
import './globals.css'
import Prayers from './component/Prayers.jsx'
import { useState , useEffect} from 'react';
export default function Home() {
// State Variables to hold prayer times and data , city selection
const [prayerTimes, setPrayerTimes] = useState({});
const [dateTime, setDateTime] = useState("");
const [city, setCity] = useState("Cairo");
// List of cities
const cities = [
{ name: "القاهرة", value: "Cairo" },
{ name: "الإسكندرية", value: "Alexandria" },
{ name: "المنصورة", value: "Mansoura" },
{ name: "طنطا", value: "Tanta" },
{ name: "أسوان", value: "Aswan" },
{ name: "الأقصر", value: "Luxor" },
{ name: "الجيزة", value: "Giza" },
{ name: "الغردقة", value: "Hurghada" },
];

// Get Prayers Times From API
useEffect(() => {
const fetchPrayerTimes = async () => {
    try {
    const today = new Date().toLocaleDateString("en-GB").split("/").join("-");
    const response = await fetch(
        `https://api.aladhan.com/v1/timingsByCity/${today}?city=${city}&country=Eg`
    );
    const datePrayer = await response.json();
    setPrayerTimes(datePrayer.data.timings);
    setDateTime(datePrayer.data.date.gregorian.date);
    } catch (error) {
    console.error("Error fetching prayer times:", error);
    }
};

fetchPrayerTimes();
}, [city]);

function formatTime(time) {
if (!time) {
    return "00:00";
}

// convert time to 12-hours format

let [hours, minutes] = time.split(":").map(Number);
const period = hours >= 12 ? "pm" : "am";
hours = hours % 12 || 12;
return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
}

return (
// city && date && payers container
<section className="flex justify-center sm:justify-start items-center min-h-[100vh] px-10 ">
  {/* city and city selection && date */}
<div className="w-full sm:max-w-[590px] px-[20px] sm:px-[30px] bg-[#332a224e] backdrop-blur-[10px] 
    rounded-[10px] border-[1px] border-[#d7d7d74e] mr-[5%] sm:mr-[15%]">
    <div className="flex sm:flex-row justify-between gap-[30px] py-[40px] mb-[40px] border-b border-b-[#d7d7d74e]">
    
    <div className="city w-full ">
        <h3 className="text-white font-bold text-2xl">المدينة</h3>
        <select
        onChange={(e) => setCity(e.target.value)}
        className="w-full sm:w-[250px] rounded-[5px] bg-[#a54f3a] px-[20px] py-[10px] text-[#fff] text-xl my-[10px]"
        >
        {cities.map((city) => (
            <option key={city.value} value={city.value}>
            {city.name}
            </option>
        ))}
        </select>
    </div>

    <div className="date w-full sm:w-[250px]">
        <h1 className="text-[#fff] font-bold text-2xl px-[14px] py-[7px]">التاريخ</h1>
        <h4 className="text-[#fff] font-bold text-2xl ">{dateTime}</h4>
    </div>
    </div>

    {/* Prayers Time */}
    <Prayers name="الفجر :" time={formatTime(prayerTimes.Fajr)} />
    <Prayers name="الظهر :" time={formatTime(prayerTimes.Dhuhr)} />
    <Prayers name="العصر :" time={formatTime(prayerTimes.Asr)} />
    <Prayers name="المغرب :" time={formatTime(prayerTimes.Maghrib)} />
    <Prayers name="العشاء :" time={formatTime(prayerTimes.Isha)} />
</div>
</section>
);
}
