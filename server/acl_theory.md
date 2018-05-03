# Acl draft

Target application flow:

Request -> cors -> auth -> contentType -> Parsing -> roleActivity1 -> activity -> response
                                                  ||                     ||
                                              async role checking        ||
                                                  ||                     ||
                                                  -> roleActivity2      notify listeners


Activity

Basic security issues:

1) user A can see user A private lists
2) user B can't see user A private lists

3) user C can see some user A private lists because user A shared them with him

4) user D can see user A semi-private lists because user A and user D belongs to the same group G

5) user E can see user A semi-private lists because user A and user E are friends

6) user F can see user A public lists

7) user Y can see user A private lists because he work for user Z
       and user A belongs to the country in charge

8) user Z broke the game because he can see anything.


#### permissions

permId | activity
-----------------------
1      | read list

#### shares

resource | resourceId | authorizedUser
------------------------------------------
lists    | 1          | userId

userId | friendId
-----------------
A      | E

**prop 1**

The first proposition is to write the restrictions in a pseudo language. The right key and the left key are
two arguments 

permId | role  | privacy      | rkey                           | FUNC     | lkey
-------------------------------------------------------------------------------------
1      | user  | private      | resource.ownerId               | =        | .id 
1      | user  | semi-private | resource.ownerId               | in       | .[]friends.id
1      | user  | semi-private | resource.organizationId        | in       | .[]organizations.id
1      | AM    | private      | resource.owner.country         | =        | .country
1      | admin | private      | 'admin'                        | in       | .[]roles

* role 'AM' = Account manager
* constraints starts with '.' to signify a key in the user

- line 3 is a bit complicated this means the resource was published as an organization. usecase 

**prop 2**

Or we can have context roles written in the code.

permId | role  | privacy      | contextRole
--------------------------------------------
1      | user  | private      | Owner
1      | user  | semi-private | FriendWithOwner
1      | user  | semi-private | SameOrg
1      | AM    | private      | SameCountry
1      | Admin | private      | NULL

```javascript
// user.js

module.exports = {
  SameOrg: context => context.requireLoader('list', 'myOrganizations')
    .then(({ myOrganizations, list }) => Promise.all([
        myOrganizations.load(context.user.id),
        list.load(context.request.listId)
      ]))
    .then(([myOrganizations, list]) => {
      assert(!!myOrganizations.find(org => org.id === list.orgId ))
    }),
  SameCountry: context => context.requireLoader('listOwners')
}
```
