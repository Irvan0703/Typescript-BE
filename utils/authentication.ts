import User from "../app/users/model";
const { AbilityBuilder, Ability } = require("@casl/ability");

export class MyAbility extends Ability {
  constructor(user: User) {
    const { can, cannot, build } = new AbilityBuilder(Ability);
    
    if (user.role.includes('admin')) {
      can('manage', 'all');
    } else {
      can('read', 'all');
      can('create', 'Article');
      can(['update', 'delete'], 'Article', { ownerId: user.id });
    }
    
    super(build());
  }
}