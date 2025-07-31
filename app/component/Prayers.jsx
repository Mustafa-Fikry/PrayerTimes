export default function prayers({name,time}){
    return(
        <div className="flex justify-between items-center px-[25px] py-[5px] bg-[#c0583e75]  
        mb-[25px] text-[#fff] text-[24px] rounded-[5px] border-[1px] border-[#d7d7d74e]">
            <p className="prayer "> {name}</p>
            <p className="date_prayer "> {time}</p>
        </div>
    );
}