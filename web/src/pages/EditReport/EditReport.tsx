import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleReport } from '../../hooks/api/reports/useGetSingleReport';
import { IReportsResponse } from '../../services/api/reports/getReports';
import { Back } from '../../shared/Back';
import Layout from '../../shared/Layout';
import { EditReportForm } from './Components/EditReportForm';

const EditReport = () => {
  const { id } = useParams();
  const [report, setReport] = useState<IReportsResponse>();

  const handleSuccess = (data: IReportsResponse) => {
    setReport(data);
  };

  const { isLoading } = useGetSingleReport(id ? id : '', {
    onSuccess: handleSuccess,
  });

  if (isLoading) return <p>loading</p>;

  return (
    <Layout>
      <div className="intro">
        <div className="intro__left">
          <Back text="Izmena prekršaja" />
        </div>
      </div>
      {report && <EditReportForm report={report} />}
    </Layout>
  );
};

export default EditReport;
