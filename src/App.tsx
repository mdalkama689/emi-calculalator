import { useEffect, useState } from "react";
import Calculator from "./components/Calculator";
import { BarChart3 } from "lucide-react";
import MobileShare from "./components/share/MobileShare";
import TabShare from "./components/share/TabShare";

function App() {
  const [deviceType, setDeviceType] = useState<"big" | "small">("big");

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth < 1024 ? "small" : "big");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      {deviceType === "small" ? <MobileShare /> : <TabShare />}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <BarChart3 className="text-blue-600 h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            Loan EMI Calculator
          </h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <Calculator />

        <div className="mt-8 max-w-3xl mx-auto text-sm text-gray-600 bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-medium mb-2">How EMI Calculator Works:</h3>
          <p className="mb-2">
            The EMI Calculator uses the following formula:
            <code className="block my-2 bg-gray-100 p-2 rounded">
              EMI = [P × r × (1 + r)^n] ÷ [(1 + r)^n - 1]
            </code>
            Where:
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>P = Principal (Loan Amount)</li>
            <li>r = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)</li>
            <li>n = Loan Tenure in Months</li>
          </ul>
          <p>
            The calculator shows your monthly EMI amount, total interest
            payable, and the total payment (principal + interest) over the loan
            tenure. The charts provide a visual representation of the payment
            distribution.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
