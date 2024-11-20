import { useEffect, useState } from 'react';
import { LeftOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    FormProps,
    Input,
    InputNumber,
    message,
    Select,
    Space,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { CategoryModel, CategoryOption } from '../models/categories';
import { ProductFormFields } from '../models/products';

type QueryParams = {
    id: string;
}
const { TextArea } = Input;

const apiUrl = import.meta.env.VITE_API_URL;

const EditProduct = () => {

    // const [product, setProduct] = useState<ProductModel | null>(null);
    const navigate = useNavigate();
    const [categories, setCategories] = useState<CategoryOption[]>([]);
    const [form] = Form.useForm<ProductFormFields>();
    const { id } = useParams<QueryParams>();

    useEffect(() => {
        fetch(apiUrl + 'products/categories').then(res => res.json()).then(data => {
            const items = data as CategoryModel[];
            setCategories(items.map(x => { return { label: x.name, value: x.id } }));
        });

        fetch(apiUrl + "products/" + id).then(res => res.json()).then(data => {
            // setProduct(data);
            form.setFieldsValue(data);
            console.log(data);
        });
    }, []);

    const onSubmit: FormProps<ProductFormFields>['onFinish'] = (item) => {
        console.log(item);

        // upload to server
        fetch(apiUrl + "products", {
            method: "PUT",
            body: JSON.stringify(item),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if (res.status === 200) {
                message.success("Product edited successfuly!");
                navigate(-1);
            }
            else {
                res.json().then(res => {
                    const msg = res.errors[Object.keys(res.errors)[0]][0];
                    message.error(msg);
                })
            }
        })
    }
    return (
        <>
            <Button onClick={() => navigate(-1)} color="default" variant="text" icon={<LeftOutlined />}></Button>
            <h2>Edit Product</h2>

            <Form<ProductFormFields>
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 18,
                }}
                layout="horizontal"
                form={form}
                onFinish={onSubmit}
            >
                <Form.Item<ProductFormFields> name="id" hidden></Form.Item>
                <Form.Item<ProductFormFields> label="Title" name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input!',
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item<ProductFormFields> label="Price" name="price">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<ProductFormFields> label="Discount" name="discount">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<ProductFormFields> label="Quantity" name="quantity">
                    <InputNumber style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item<ProductFormFields> label="Category" name="categoryId">
                    <Select options={categories}></Select>
                </Form.Item>
                <Form.Item<ProductFormFields> label="Description" name="description">
                    <TextArea rows={4} />
                </Form.Item>
                {/* <Form.Item label="Image" name="image" valuePropName="file" getValueFromEvent={normFile}>
                    <Upload maxCount={1}>
                        <Button icon={<UpCircleOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item> */}
                <Form.Item<ProductFormFields> label="Image" name="imageUrl">
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Space>
                        <Button type="default" htmlType="reset">
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Edit
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </>
    );
};
export default EditProduct;