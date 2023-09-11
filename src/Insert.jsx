import { Drawer, Form, Input, Button, Row, Col } from 'antd'
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';

const Insert = ({ openInsert, onClose }) => {
    const [form] = useForm()

    const onFinish = (values) => {
        console.log('values--', values);
        axios.post('https://cv.iflingo.com/api/users', values).then(({ data }) => {
            console.log('post', data);
        })
    }
    return (
        <>
            <Drawer open={openInsert} onClose={onClose}>
                <Form layout='vertical' onFinish={onFinish} form={form}>
                    <Row>
                        <Col span={24}>
                            <Form.Item label='Ad' name='name' required={[{ required: true, message: 'zehmet olmasa ad daxil edin' }]} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label='Soyad' name='surname' required={[{ required: true, message: 'zehmet olmasa ad daxil edin' }]} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label='Ata adi' name='father' required={[{ required: true, message: 'zehmet olmasa ad daxil edin' }]} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label='Email' name='email' required={[{ required: true, message: 'zehmet olmasa ad daxil edin' }]} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item label='Kod' name='password' required={[{ required: true, message: 'zehmet olmasa ad daxil edin' }]} >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item>
                                <Button type='primary' htmlType='submit'>
                                    Yadda saxla
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Drawer>

            {/* <form action="">
                <input type="text" required />
                <button type='submit'></button>
            </form> */}
        </>
    )
}

export default Insert;