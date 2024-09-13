import { _decorator, Component, Node } from 'cc';
import { II } from "./InterfaceInjection";

const {ccclass, property} = _decorator;

interface ITest {
}

@ccclass('Test')
@II.InjectInterface("ITest")
export class Test extends Component implements ITest {
    start() {
        // console.log(this.node.components
        //     .filter(comp => Reflect.hasMetadata("ITest", comp.constructor)));
        console.log(II.GetComponent<ITest>("ITest", this.node));
    }

    update(deltaTime: number) {

    }
}


