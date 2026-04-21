import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/dashboard-layout";
import { AllLinksPage } from "./pages/all-links";
import { CreateLinkPage } from "./pages/create-link";
import { OverviewStatsPage } from "./components/overview/overview-stats-state";
import PDFViewer from "./pages/SecurePdfSigner";
// import PayrollWizard from "./components/client/payroll-wizard";
import Test from "./pages/test2";
import ScrollablePdfViewer from "./pages/custom-pdf";
import PdfUploadViewer from "./pages/pdf";
import SimplePdfViewer from "./pages/simple-pdf";
import SamplePdfPage from "./pages/sample";
import SignDocumentWizard from "./components/wizard/wizard-layout";
import LandingPage from "./pages/home";

// Simple page components for testing
// const Overview = () => <div className="text-2xl font-bold">Overview Page</div>;
// const AllLinks = () => <div className="text-2xl font-bold">All Links Page</div>;
const Signatures = () =>  <p>signature</p>;
const Invoices = () => <div className="text-2xl font-bold">Invoices Page</div>;
const Settings = () => <div className="text-2xl font-bold">Settings Page</div>;

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/overview" element={<OverviewStatsPage />} />
          <Route path="/all-links" element={<AllLinksPage />} />
          <Route path="/signatures" element={<Signatures />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/create-link" element={<CreateLinkPage />} />
        </Route>
          <Route path="/client" element={<SignDocumentWizard />} />
          <Route path="/w" element={<Test />} />
          <Route path="/u" element={<PdfUploadViewer />} />
          <Route path="/x" element={<SamplePdfPage />} />
          <Route path="/s" element={<SimplePdfViewer fileUrl="/sp.pdf" />} />
          <Route path="/d" element={<ScrollablePdfViewer file="/sp.pdf" />} />
          <Route path="/p" element={<PDFViewer fileUrl="/sp.pdf" x={200} y={200} page={1} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;