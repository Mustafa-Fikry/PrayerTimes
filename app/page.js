"use client";
import './globals.css'
import Prayers from './component/Prayers.jsx'
import { useState , useEffect} from 'react';
export default function Home() {
const [prayerTimes, setPrayerTimes] = useState({});
const [dateTime, setDateTime] = useState("");
const [city, setCity] = useState("Cairo");

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

let [hours, minutes] = time.split(":").map(Number);
const period = hours >= 12 ? "pm" : "am";
hours = hours % 12 || 12;
return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
}
return (
    <section className=' flex justify-start items-center min-h-[100vh]'>
        <div className='w-[590px] px-[30px] bg-[#332a224e] backdrop-blur-[10px] 
        rounded-[10px] border-[1px] border-[#d7d7d74e] mr-[15%]'>
            <div className='flex justify-between py-[40px] mb-[40px] border-b border-b-[#d7d7d74e] '>
                <div className="city">
                <h3 className=' text-white font-bold text-2xl'>المدينة</h3>
                <select onChange={(e) => setCity(e.target.value)} className='w-[250px] rounded-[5px] bg-[#a54f3a] px-[20px] py-[10px] text-[#fff] text-xl my-[10px]'>
                    {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                    {city.name}
                    </option>))}
                </select>
            </div>
            <div className="date w-[250px]">
                <h1 className='text-[#fff] font-bold text-2xl px-[14px] py-[7px]'>التاريخ</h1>
                <h4 className='text-[#fff] font-bold text-2xl'>{dateTime}</h4>
            </div>
            </div>
        <Prayers name = "الفجر :"  time ={formatTime(prayerTimes.Fajr)}/>
        <Prayers name = "الظهر :"  time = {formatTime(prayerTimes.Dhuhr)}/>
        <Prayers name = "العصر :"  time = {formatTime(prayerTimes.Asr)}/>
        <Prayers name = "المغرب :"  time = {formatTime(prayerTimes.Maghrib)}/>
        <Prayers name = "العشاء :"  time = {formatTime(prayerTimes.Isha)}/>
        </div>
    </section>
);
}
