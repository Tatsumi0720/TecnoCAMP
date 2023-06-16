import { Layout } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import ProductDetails from '../../../components/Client/ProductDetails/ProductDetails';

const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  paddingInline: "0px",
  // color: '#fff',
  height: 220,
  // display:"flex",
  // width: "100vw",
  lineHeight: '60px',
  // backgroundColor: '#7dbcea',
};
const contentStyle = {
  textAlign: 'center',
  minHeight: 220,

  color: '#0000',
  backgroundColor: '#fff',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

const ProductDetailsView = () => (
    

  <Layout >
    <Header style={headerStyle}><DashboardUser /></Header>
    <Content style={contentStyle}>
      <ProductDetails />
    </Content>
    <Footer style={footerStyle}>Footer</Footer>
  </Layout>


);
export default ProductDetailsView;