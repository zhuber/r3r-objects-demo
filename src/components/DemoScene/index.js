import * as THREE from "three";

import React from "react";
import React3 from "react-three-renderer";
import ObjectModel from 'react-three-renderer-objects';
import exampleModel from "../../assets/TechnicLEGO_CAR_1.obj";
import exampleTexture from "../../assets/TechnicLEGO_CAR_1.mtl";

class DemoScene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cameraPosition: new THREE.Vector3(0, 300, 750),
      groupRotation: new THREE.Euler(0, 0, 0),
      scene: {}
    };
  }

  componentDidMount() {
    const { scene } = this.refs;
    this.setState({ scene });
    document.addEventListener('mousedown', this.onDocumentMouseDown, false);
  }

  componentWillMount() {
    this.targetRotationOnMouseDown = 0;
    this.mouseX = 0;
    this.mouseXOnMouseDown = 0;
    this.targetRotation = 0;

    this.onDocumentMouseDown = event => {
      event.preventDefault();

      document.addEventListener('mousemove', this.onDocumentMouseMove, false);
      document.addEventListener('mouseup', this.onDocumentMouseUp, false);
      document.addEventListener('mouseout', this.onDocumentMouseOut, false);

      let windowHalfX = document.body.clientWidth / 2;

      this.mouseXOnMouseDown = event.clientX - windowHalfX;
      this.targetRotationOnMouseDown = this.targetRotation;
    };

    this.onDocumentMouseMove = event => {
      let windowHalfX = document.body.clientWidth / 2;

      this.mouseX = event.clientX - windowHalfX;

      this.targetRotation =
        this.targetRotationOnMouseDown +
        (this.mouseX - this.mouseXOnMouseDown) * 0.02;
    };

    this.onDocumentMouseUp = () => {
      document.removeEventListener(
        'mousemove',
        this.onDocumentMouseMove,
        false
      );
      document.removeEventListener('mouseup', this.onDocumentMouseUp, false);
      document.removeEventListener('mouseout', this.onDocumentMouseOut, false);
    };

    this.onDocumentMouseOut = () => {
      document.removeEventListener(
        'mousemove',
        this.onDocumentMouseMove,
        false
      );
      document.removeEventListener('mouseup', this.onDocumentMouseUp, false);
      document.removeEventListener('mouseout', this.onDocumentMouseOut, false);
    };
  }

  updateScene = () => {
    let groupRotationY = (this.state.groupRotation) ? this.state.groupRotation.y : 0;
    let groupRotation;

    if (Math.abs(groupRotationY - this.targetRotation) > 0.0001) {
      groupRotation = new THREE.Euler(
        0,
        groupRotationY + (this.targetRotation - groupRotationY) * 0.05,
        0
      );
    }

    this.setState({
      groupRotation
    });
  }

  render() {

    let width = window.innerWidth;
    let height = window.innerHeight;

    return (
      <React3
        mainCamera="camera"
        antialias
        shadowMapEnabled
        width={width}
        height={height}
        alpha={true}
        onAnimate={this.updateScene}
      >
        <scene ref="scene">
          <perspectiveCamera
            key={`perspectiveCamera`}
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.state.cameraPosition}
            lookAt={new THREE.Vector3(0, 0, 0)}
          />
          <group>
            <spotLight
              key={`Light 1`}
              color={0xffffff}
              position={new THREE.Vector3(0, 300, 0)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              castShadow
              penumbra={2}
              intensity={0.2}
              shadowMapWidth={10240}
              shadowMapHeight={10240}
            />

            <directionalLight
              key={`Light 2`}
              color={0xffffff}
              position={new THREE.Vector3(0, 500, 100)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.5}
            />

            <spotLight
              key={`Light 3`}
              color={0xffffff}
              position={new THREE.Vector3(0, 100, 2000)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.35}
            />

            <spotLight
              key={`Light 4`}
              color={0xffffff}
              position={new THREE.Vector3(-500, 0, 500)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.1}
            />

            <spotLight
              key={`Light 5`}
              color={0xffffff}
              position={new THREE.Vector3(500, 0, 500)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.1}
            />

            <spotLight
              key={`Light 6`}
              color={0xffd0b1}
              position={new THREE.Vector3(-500, 450, 500)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.375}
            />

            <spotLight
              key={`Light 7`}
              color={0x80ecff}
              position={new THREE.Vector3(500, 450, 500)}
              lookAt={new THREE.Vector3(0, 0, 0)}
              intensity={0.375}
            />
          </group>

          <group name="exampleGroup" rotation={this.state.groupRotation}>
            <ObjectModel
              name="exampleObject"
              model={exampleModel}
              material={exampleTexture}
              scene={this.state.scene}
              group="exampleGroup"
            />
          </group>
        </scene>
      </React3>
    );
  }
}

export default DemoScene;
