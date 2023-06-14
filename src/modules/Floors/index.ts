import * as THREE from 'three'
import type Viewer from '../Viewer'

export default class Floors {
  protected viewer: Viewer
  public planeWidth = 500
  public planeHeight = 500

  constructor(viewer: Viewer) {
    this.viewer = viewer
    this.initFlooer()
  }

  private initFlooer() {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(this.planeWidth, this.planeHeight),
      new THREE.MeshPhongMaterial({ color: 0xbbbbbb, depthWrite: false }),
    )
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    this.viewer.scene.add(ground)
  }

  /**网格辅助线 */
  public addGird(
    size = 500,
    divisions = 20,
    colorCenterLine = 0x888888,
    colorGrid = 0x888888,
  ) {
    const grid = new THREE.GridHelper(
      size,
      divisions,
      colorCenterLine,
      colorGrid,
    )
    this.viewer.scene.add(grid)
  }
}
