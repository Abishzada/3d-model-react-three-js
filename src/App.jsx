import { Table, Tag, Space, Row, Col, Button, Drawer } from 'antd';
import { useEffect, useState, useRef, useCallback } from 'react';
import './App.css'
import axios from 'axios';
import Insert from './Insert';
import { useGLTF } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from 'drei/OrbitControls';
import { PerspectiveCamera, WebGLRenderer, MeshStandardMaterial, Mesh, Box3, Vector3, Raycaster, Vector2 } from 'three';
// import { useMaterial } from '@react-three/drei';

function App() {
  const [tableData, setTableData] = useState([])
  const [openInsert, setOpenInsert] = useState(false)
  const [objectsToIntersect, setObjectsToIntersect] = useState([])
  const modelViewerRef = useRef(null);
  const GLTFLoader = dynamic(() => import('three/addons/loaders/GLTFLoader'));

  const gltf = useLoader(GLTFLoader, '../buggy.gltf', undefined, (error) => console.log('error', error))
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const raycaster = new Raycaster();
  const mouse = new Vector2();
  const objectsToIntersectRef = useRef([]);

  const modelRef = useRef();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'information',
      key: 'name',
      render: (text) => `${text?.name || ''} ${text?.surname || ''} ${text?.father || ''} `,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    }
  ];

  const renderTableView = () => {
    axios.get('https://cv.iflingo.com/api/users').then(({ data }) => {
      setTableData(data.data)
    })

  }


  const handleOpenInsert = () => {
    setOpenInsert(true)
  }

  const handleClick = (event) => {
    const { uuid } = event.object
    objectsToIntersect?.map(v => {
      if (uuid === v?.uuid) v.material.color.set(Math.random() * 0xffffff);
      if (uuid === v?.uuid) console.log('clicked obj', v);
    })

  };


  const onClose = () => {
    setOpenInsert(false)
  }


  useEffect(() => {
    renderTableView()

    const _setObjectsToIntersect = []
    gltf.scene.traverse((child) => {
      child.isMesh && _setObjectsToIntersect.push(child)
    });
    objectsToIntersectRef.current = [..._setObjectsToIntersect];
    setObjectsToIntersect([...objectsToIntersectRef.current])

    const bbox = new Box3().setFromObject(gltf.scene);
    const modelBoundingBox = new Box3().setFromObject(gltf.scene);
    const modelSize = new Vector3();
    modelBoundingBox.getSize(modelSize);

    const desiredCenterX = modelBoundingBox.min.x + modelSize.x / 2;
    const desiredCenterY = modelBoundingBox.min.y + modelSize.y / 2;
    const desiredCenterZ = modelBoundingBox.min.z + modelSize.z / 2;
    camera.position.set(desiredCenterX, desiredCenterY, desiredCenterZ);

  }, [modelViewerRef.current, gltf])

  useEffect(() => {

  }, [])

  return (
    <>
      <Row>
        <Col span={24}>
          <Button onClick={handleOpenInsert} size='large' type='primary'>Elave et</Button>
        </Col>
        <Col span={12}>
          <Table
            columns={columns}
            dataSource={tableData}
            rowKey={record => record.uuid}
          />
        </Col>
        <Col span={12} className='modelContainer'>
          <Canvas camera={{ position: [12, 67, 190], fov: 75 }}>
            <OrbitControls />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <group ref={modelRef} material={objectsToIntersect} onClick={handleClick} scale={[1, 1, 1]}>
              <primitive object={gltf?.scene} />
            </group>
          </Canvas>
        </Col>
      </Row>
      <Insert
        openInsert={openInsert}
        onClose={onClose}
      />
    </>
  )
}
export default App
