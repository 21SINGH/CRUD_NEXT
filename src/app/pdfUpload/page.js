import GetPdf from "@/components/getPdf";

import PdfUpload from "@/components/pdfUpload";


export default function index(){

    return(
        <div>
            <PdfUpload />
            <GetPdf />
        </div>
    )
}