import { Layout } from './components/Layout';
import { Popup } from './widget/Popup';

const App: React.FC = () => {
    return (
        <div>
            <Layout>
                <Popup />
            </Layout>
        </div>
    );
};

export default App;
