import "reflect-metadata";
import { Node } from "cc";

export namespace II {
    export function InjectInterface(name: string) {
        return function (constructor: any) {
            const onLoadOriginal = constructor.prototype.onLoad;

            constructor.prototype.onLoad = function () {
                if (onLoadOriginal) {
                    onLoadOriginal.apply(this);
                }

                Reflect.defineMetadata(name, true, constructor);
            };

        };
    }

    export function GetComponents<T>(interfaceName: string, target: Node): T[] {
        return target.components
            .filter(comp => Reflect.hasMetadata(interfaceName, comp.constructor)) as T[];
    }

    export function GetComponent<T>(interfaceName: string, target: Node): T {
        let comps = GetComponents<T>(interfaceName, target);

        return comps.length == 0 ? null : comps[0];
    }

    export function GetComponentsInChildren<T>(interfaceName: string, target: Node): T[] {
        return target.children.map(child => GetComponent(interfaceName, child));
    }

    export function GetComponentInChildren<T>(interfaceName: string, target: Node): T {
        let comps = GetComponentsInChildren<T>(interfaceName, target);

        return comps.length == 0 ? null : comps[0];
    }
}
