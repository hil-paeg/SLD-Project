import Image from "next/image";

export default function LegendDetailsTable() {
  return (
      <div className="inline-block border-2 border-black bg-white" style={{ position: "relative" }}>
        {/* Header */}
        <div className="border-b-2 border-black px-4 py-2 text-center text-black font-bold">
          LEGEND DETAILS
        </div>

        {/* Rows */}
        <div className="divide-y-2 divide-black">
          {/* Sine Filter1/Low Pass Filter */}
          <div className="flex">
            <div className="border-r-2 border-black p-3 w-24 h-22 flex items-center justify-center relative">
              <Image
                src="/Sine-filter.svg"
                alt="Sine Filter"
                width={50}
                height={40}
                className="object-contain"
                style={{ transform: "translate(0px, -30px)" }}
              />
              <Image
                src="/Sine-Filter2.svg"
                alt="Sine Filter"
                width={40}
                height={40}
                className="object-contain"
                style={{ transform: "translate(-5px, 10px)" }}
              />
            </div>
            <div className="px-5 py-3 flex items-center font-medium text-black">
              Sine Filter/
              <br />
              Low Pass Filter
            </div>
          </div>

          {/* DC OFF Load Isolator */}
          <div className="flex">
            <div className="border-r-2 border-black p-3 w-24 h-24 flex items-center justify-center relative">
              <Image
                src="/DC-OFF-load-isolator.svg"
                alt="DC OFF Load Isolator"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="px-6 py-3 flex items-center font-medium text-black">
              DC OFF Load
              <br />
              Isolator with
              <br />
              Enclosure
            </div>
          </div>

          {/* Output Contactor */}
          <div className="flex">
            <div className="border-r-2 border-black p-3 w-24 h-22 flex items-center justify-center relative">
              <Image
                src="/output-contactor.svg"
                alt="Output Contactor"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="px-4 py-3 flex items-center font-medium text-black">
              Output Contactor
            </div>
          </div>

          {/* Input Choke */}
          <div className="flex">
            <div className="border-r-2 border-black p-3 w-24 h-22 flex items-center justify-center relative">
              <Image
                src="/input-choke.svg"
                alt="Input Choke"
                width={95}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="px-8 py-3 flex items-center font-medium text-black">
              Input Choke
            </div>
          </div>

          {/* Switch with Protection */}
          <div className="flex">
            <div className="border-r-2 border-black p-3 w-24 h-22 flex items-center justify-center relative">
              <Image
                src="/Switch-with-protection.svg"
                alt="Switch with Protection"
                width={27}
                height={40}
                className="object-contain"
              />
            </div>
            <div className="px-8 py-3 flex items-center font-medium text-black">
              Switch with
              <br />
              Protection
            </div>
          </div>
        </div>
      </div>
  );
}