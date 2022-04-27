import { expect } from "chai";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import configureMockStore from "redux-mock-store";
import thunkMiddleware from "redux-thunk";
import { setCart } from "./cart";

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe("thunk creators", () => {
  let store;
  let mockAxios;

  const initialState = { cart: [] };

  beforeEach(() => {
    //no browser available, we need to stub out localStorage
    global.window = {
      localStorage: {
        removeItem: () => {},
        getItem: () => {
          return "some-token";
        },
        setItem: () => {},
      },
    };
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe("cart", () => {
    describe("with valid token", () => {
      beforeEach(() => {
        global.window = {
          localStorage: {
            removeItem: () => {},
            getItem: () => {
              return "some-token";
            },
            setItem: () => {},
          },
        };
      });
      it("eventually dispatches the SET_CART action", async () => {
        const fakeUser = { username: "Cody", password: 123 };
        mockAxios.onGet("/api/cart").replyOnce(200, fakeUser);
        await store.dispatch(setCart());
        const actions = store.getActions();
        expect(actions[0].type).to.be.equal("SET_CART");
      });
    });
    describe("without valid token", () => {
      beforeEach(() => {
        global.window = {
          localStorage: {
            removeItem: () => {},
            getItem: () => {},
            setItem: () => {},
          },
        };
      });
      it("dispatches GET CART state and gets empty cart", async () => {
        mockAxios.onGet("/api/cart").replyOnce(401);
        const state = store.getState();
        expect(state.cart).to.deep.equal([]);
      });
    });
  });
});
