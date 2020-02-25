const graphql = require("graphql");

// Javascript Destructing
// GraphQL functions
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

// Import controllers
const placeController = require("../controllers/place.controller");
const ownerController = require("../controllers/owner.controller");
const tenantController = require("../controllers/tenant.controller");

// Define GraphQL Object Types

// Place Type
const placeType = new GraphQLObjectType({
    name: "Place",
    fields: () => ({
        _id: { type: GraphQLID },
        title: { type: GraphQLString },
        city: { type: GraphQLString },
        ownerId: { type: GraphQLID },
        tenantId: { type: GraphQLID },
        owner: {
            type: ownerType,
            async resolve(parent, args) {
                return await ownerController.getOwner({ id: parent.ownerId });
            }
        },
        tenant: {
            type: tenantType,
            async resolve(parent, args) {
                return await tenantController.getTenant({ id: parent.tenantId });
            }
        }
    })
});

// Owner Type
const ownerType = new GraphQLObjectType({
    name: "Owner",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        age: { type: GraphQLInt },

    })
});

// Tenant Type
const tenantType = new GraphQLObjectType({
    name: "Tenant",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        surname: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        place: {
            type: placeType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return await placeController.getPlace(args);
            }
        },
        owner: {
            type: ownerType,
            args: { id: { type: GraphQLID } },
            async resolve(parent, args) {
                return await ownerController.getOwner(args);
            }
        },
        owners: {
            type: new GraphQLList(ownerType),
            async resolve(parent, args) {
                return await ownerController.getOwners();
            }
        },
        places: {
            type: new GraphQLList(placeType),
            async resolve(parent, args) {
                return await placeController.getPlaces();
            }
        }
    }
});

// Mutations. These will change the data
const Mutations = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        addPlace: {
            type: placeType,
            args: {
                title: { type: GraphQLString },
                city: { type: GraphQLString },
                ownerId: { type: new GraphQLNonNull(GraphQLID) },
                tenantId: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                const data = await placeController.createPlace(args);
                return data;
            }
        },
        editPlace: {
            type: placeType,
            args: {},
            async resolve(args) {
                return "";
            }
        },
        deletePlace: {
            type: placeType,
            args: {},
            async resolve(args) {
                return "";
            }
        },
        addOwner: {
            type: ownerType,
            args: {
                _id: { type: GraphQLID },
                name: { type: GraphQLString },
                surname: { type: GraphQLString },
                age: { type: GraphQLInt },
            },
            async resolve(parent, args) {
                const data = await ownerController.createOwner(args);
                return data;
            }
        }, addTenant: {
            type: tenantType,
            args: {
                _id: { type: GraphQLID },
                name: { type: GraphQLString },
                surname: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            async resolve(parent, args) {
                const data = await tenantController.createTenant(args);
                return data;
            }
        }
    }
});

// Export schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutations
});