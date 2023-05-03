"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyAbility = void 0;
const { AbilityBuilder, Ability } = require("@casl/ability");
class MyAbility extends Ability {
    constructor(user) {
        const { can, cannot, build } = new AbilityBuilder(Ability);
        if (user.role.includes('admin')) {
            can('manage', 'all');
        }
        else {
            can('read', 'all');
            can('create', 'Article');
            can(['update', 'delete'], 'Article', { ownerId: user.id });
        }
        super(build());
    }
}
exports.MyAbility = MyAbility;
