"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPhaseEnum = void 0;
var EventPhaseEnum;
(function (EventPhaseEnum) {
    /**
     * Called before to check whether the event may proceed
     */
    EventPhaseEnum["ALLOW"] = "allow";
    /**
     * Called before the event prepares execution
     */
    EventPhaseEnum["PREPARE"] = "prepare";
    /**
     * Called just before the event is actually fired
     */
    EventPhaseEnum["PERFORM"] = "perform";
    /**
     * Called just after the event fired
     */
    EventPhaseEnum["PERFORMED"] = "performed";
    /**
     * Called if the event is canceled at any stage before performed
     */
    EventPhaseEnum["CANCELED"] = "canceled";
    /**
     * Called at the very end for both performed and canceled scenarios
     */
    EventPhaseEnum["AFTER"] = "after";
})(EventPhaseEnum || (exports.EventPhaseEnum = EventPhaseEnum = {}));
//# sourceMappingURL=event-phase.enum.js.map