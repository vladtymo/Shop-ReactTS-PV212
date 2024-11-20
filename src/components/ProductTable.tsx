import { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space, Table, TableProps, Tag } from 'antd';
import { AppstoreAddOutlined, DeleteFilled, EditFilled, InfoCircleFilled, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { ProductModel } from '../models/products';
import api from '../services/api';

const apiPath = import.meta.env.VITE_API_URL;

const ProductTable = () => {

    const [products, setProducts] = useState<ProductModel[]>([]);

    const columns: TableProps<ProductModel>['columns'] = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'image',
            render: (_, item) => <img height={50} src={item.imageUrl} alt={item.name}></img>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text, item) => <Link to={`/products/${item.id}`}>{text}</Link>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <span>{text}$</span>,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (text) => <span>{text}%</span>,
        },
        {
            title: 'Stock',
            dataIndex: 'quantity',
            key: 'stock',
            render: (text) =>
                text > 0 ?
                    <Tag color="green">Available</Tag>
                    :
                    <Tag color="volcano">Out of Stock</Tag>
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/products/${record.id}`}>
                        <Button color="default" variant="outlined" icon={<InfoCircleFilled />} />
                    </Link>
                    <Button style={{ color: '#61916e' }} variant="outlined" icon={<LikeOutlined />} />
                    <Link to={`/edit/${record.id}`}>
                        <Button style={{ color: '#faad14' }} variant="outlined" icon={<EditFilled />} />
                    </Link>
                    <Popconfirm
                        title="Delete the product"
                        description={`Are you sure to delete ${record.name}?`}
                        onConfirm={() => deleteItem(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button color="danger" variant="outlined" icon={<DeleteFilled />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // load data from server
    useEffect(() => {
        fetch(apiPath + "products/all")
            .then(res => res.json())
            .then((data) => {
                const items = data as ProductModel[];
                setProducts(items.sort((x, y) => y.id - x.id));
            });
    }, []);

    const deleteItem = (id: number) => {

        api.delete("products/" + id).then(res => {
            if (res.status === 200) {
                setProducts(products.filter(x => x.id !== id));
                message.success('Product deleted successfuly!');
            }
            else
                message.error("Something went wrong!");
        });
    }

    return (
        <>
            <div>
                <Link to="/create">
                    <Button type="primary" icon={<AppstoreAddOutlined />} style={{ marginBottom: '16px' }}>
                        Create New Product
                    </Button>
                </Link>
            </div>
            <Table columns={columns} dataSource={products} rowKey="id" />
        </>
    )
}
export default ProductTable;