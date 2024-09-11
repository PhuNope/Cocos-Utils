export class MathUtil {
    public static Remap(x: number, currentMin: number, currentMax: number, newMin: number, newMax: number) {
        return newMin + (x - currentMin) * (newMax - newMin) / (currentMax - currentMin);
    }


    public static RandomAround(vector: cc.Vec2, radius: number): cc.Vec2;
    public static RandomAround(vector: cc.Vec3, radius: number): cc.Vec3;
    public static RandomAround(vector: cc.Vec2 | cc.Vec3, radius: number): cc.Vec2 | cc.Vec3 {
        const angle = Math.random() * 2 * Math.PI; // Góc ngẫu nhiên từ 0 đến 2*PI
        const distance = Math.random() * radius; // Bán kính ngẫu nhiên từ 0 đến radius

        const x = vector.x + distance * Math.cos(angle);
        const y = vector.y + distance * Math.sin(angle);

        if (vector instanceof cc.Vec2) return new cc.Vec2(x, y);

        return new cc.Vec3(x, y, vector.z);
    }

    /**
     * @description convert bounding box to world and AABBs of children don't matter
     * @constructor
     */
    public static ConvertBoundingBoxToWorld(node: cc.Node): cc.Rect {
        const localRect = node.getBoundingBox();

        let worldPos = node.parent ? node.parent.convertToWorldSpaceAR(node.getPosition()) : node.convertToWorldSpaceAR(cc.Vec2.ZERO);

        const worldRect = new cc.Rect(worldPos.x - localRect.width / 2, worldPos.y - localRect.height / 2, localRect.width, localRect.height);

        return worldRect;
    }

    /**
     * @description convert local position of node A to local position of node B
     * @param nodeA
     * @param nodeB
     * @constructor
     */
    public static ConvertPositionLocalNodeAToLocalNodeB(localPos: cc.Vec2 | cc.Vec3, nodeA: cc.Node, nodeB: cc.Node) {
        const worldPositionA = nodeA.convertToWorldSpaceAR(localPos);
        return nodeB.convertToNodeSpaceAR(worldPositionA);
    }

    /**
     * @description random int with min <= x < max
     * @param min
     * @param max
     * @constructor
     */
    public static RandomRangeInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}