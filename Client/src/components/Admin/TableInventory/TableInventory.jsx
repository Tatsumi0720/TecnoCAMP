import { useSelector, useDispatch } from "react-redux";
import { useForm } from 'antd/lib/form/Form';
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Modal,
  Col,
  DatePicker,
  Drawer,
  Form,
  Row,
  Select,
} from "antd";
import { useRef, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import { getAllProducts,putProduct } from "../../../Redux/Features/admin/products/adminProductsSlice";
const { Option } = Select;

function TableInventory() {
  const [form] = useForm();
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const allProducts = useSelector((state) => state.adminProducts.allProducts);
  const allCategories = useSelector(
    (state) => state.adminCategories.allCategories
  );
  const allBrands = useSelector((state) => state.adminBrands.allBrands);

  useEffect(() => {
    dispatch(getAllProducts(token));
  }, [dispatch]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      render: (photo) => (
        <>
          {" "}
          <img
            style={{ maxHeight: "10vh", width: "5vw", borderRadius: "10%" }}
            src={photo}
          />{" "}
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "key",
      width: "30%",
      ...getColumnSearchProps("name"),
      sorter: (c, d) => c.name.length - d.name.length,
      sortDirections: ["descend", "ascend"],
     // render:()=>(<><button onClick={console.log("hola soy key", columns.title)} >id</button></>)
    },
    {
      title: "Stock",
      dataIndex: "total_quantity_inventory",
      key: "key",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "key",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "key",
      width: "20%",
      /* ...getColumnSearchProps("category"), */
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "key",
      ...getColumnSearchProps("brand"),
      sorter: (a, b) => a.brand.length - b.brand.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Acciones",
      dataIndex: "acciones",
      render: (fila, key) => (
        <>
          {" "}
          <Button type="primary" onClick={()=>showDrawer(key.key)}>
            Editar
          </Button>{" "}
          {"  "}{" "}
          <Button type="primary" danger onClick={()=> console.log("soy all", key.key)} >
            Eliminar
          </Button>{" "} 
        </>
      ),
    },
  ];

  const [selectedProductId, setSelectedProductId] = useState(null);
  
  const data =
    allProducts &&
    allProducts.map((c) => {
      return {
        key: c.id,
        price: c.price,
        photo: c.photo,
        name: c.name,
        total_quantity_inventory: c.total_quantity_inventory,
        category: c.category.name,
        brand: c.brand.name,
        color: c.inventories.map((d) => {
          return {
            color: d.color,
            quantity_inventory: d.quantity_inventory,
          };
        }),
      };
    });

 // console.log("SOY TODO PA", allProducts);
   //console.log("soy data.id", data.id);

  const [open, setOpen] = useState(false);
  const showDrawer = (idProduct) => {
    setSelectedProductId(idProduct);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    console.log('valores', values)
    console.log(selectedProductId)
    dispatch(putProduct([token,selectedProductId, values]))
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        style={{ marginTop: "8vh" }}
      />

      <Drawer
        title="Editar producto"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => form.submit()} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark form={form} onFinish={onFinish} >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Nombre"
                rules={[
                  {
                    required: false,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input  defaultValue={data.key} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="price"
                label="Precio"
                rules={[
                  {
                    required: false,
                    message: "Please enter user name",
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Categoría"
                rules={[
                  {
                    required: false,
                    message: "Please select an owner",
                  },
                ]}
              >
                <Select placeholder="Please select an owner">
                  {allCategories &&
                    allCategories.map((category) => {
                      return (
                        <Option value={category.id}>{category.name}</Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="brand"
                label="Marca"
                rules={[
                  {
                    required: false,
                    message: "Please choose the type",
                  },
                ]}
              >
                <Select placeholder="Please choose the type">
                {allBrands &&
                    allBrands.map((category) => {
                      return (
                        <Option value={category.id}>{category.name}</Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
       
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: false,
                    message: "please enter url description",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
       

        </Form>
      </Drawer>
    </>
  );
}

export default TableInventory;
