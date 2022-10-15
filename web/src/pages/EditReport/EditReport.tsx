import { Back } from '../../shared/Back';
import Layout from '../../shared/Layout';
import { EditReportForm } from './Components/EditReportForm';

const EditReport = () => {
  return (
    <Layout>
      <div className="intro">
        <div className="intro__left">
          <Back text="Izmena prekršaja" />
        </div>
      </div>
      <EditReportForm />
    </Layout>
  );
};

export default EditReport;
