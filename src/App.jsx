import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Layout } from "@/components/layout/Layout";
import { Dashboard } from "@/pages/Dashboard";
import { Customers } from "@/pages/Customers";
import { Pipeline } from "@/pages/Pipeline";
import { Settings } from "@/pages/Settings";
import { CompanyDetail } from "@/pages/CompanyDetail";

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/musteriler" element={<Customers />} />
              <Route path="/firsatlar" element={<Pipeline />} />
              <Route path="/ayarlar" element={<Settings />} />
              <Route path="/sirket/:companyId" element={<CompanyDetail />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
