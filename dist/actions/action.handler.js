"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionHandler = void 0;
class ActionHandler {
    apply(context) {
        if (context.action.action.attachable) {
            const statusHolder = context.action.target;
            if (statusHolder) {
                const effect = statusHolder.tryAddStatus(context.action, context);
                if (!effect) {
                    this.remove(context.action);
                }
            }
        }
        if (context.action.stacks) {
            throw new Error('Not yet implemented.');
        }
        if ((context.action.triggers?.length ?? 0) > 0) {
            context.action.engine.attachTriggers(context.action);
            return true;
        }
        else {
            return this.trigger(context);
        }
    }
    trigger(context) {
        if (context.event === undefined ||
            context.action.statusEffect === undefined) {
            return this.perform(context, true);
        }
        throw new Error('Not yet implemented.');
    }
    perform(context, callNext) {
        if (!this.tryRun(context)) {
            if (context.action.debug) {
                console.debug('Action', context.action.action.type, 'failed to run');
            }
            return false;
        }
        if (callNext && context.action.action.next) {
            throw new Error('Not ready yet');
        }
        return true;
    }
    remove(context) {
        throw new Error('remove() not implemented for handler ' + this.constructor.name);
    }
    onEvent(action, event, phase) {
        throw new Error('onEvent() not implemented for handler ' + this.constructor.name);
    }
    setAttached(effect, triggerContext) {
        throw new Error('setAttached() not implemented for handler ' + this.constructor.name);
    }
}
exports.ActionHandler = ActionHandler;
//# sourceMappingURL=action.handler.js.map