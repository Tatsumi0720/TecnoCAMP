import { Layout } from 'antd';
import DashboardUser from '../../../components/Client/DashboardUser/DashboardUser';
import ProductDetails from '../../../components/Client/ProductDetails/ProductDetails';
import FooterUser from '../../../components/Client/Footer/FooterUser';

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
  width:"100vw",
  color: '#0000',
  
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  margin:"0px",
  padding:"0px"
};

const ProductDetailsView = () => (
    

  <Layout >
    <Header style={headerStyle}><DashboardUser /></Header>
    <Content style={contentStyle}>
      <ProductDetails style={{width:"100vw", alignItems:"center"}}/>
    </Content>
    <Footer style={footerStyle}><FooterUser/></Footer>
  </Layout>


);
export default ProductDetailsView;