// THIS FILE IS AUTOMATICALLY GENERATED BY SPACETIMEDB. EDITS TO THIS FILE
// WILL NOT BE SAVED. MODIFY TABLES IN YOUR MODULE SOURCE CODE INSTEAD.

/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
import {
  AlgebraicType,
  AlgebraicValue,
  BinaryReader,
  BinaryWriter,
  CallReducerFlags,
  ConnectionId,
  DbConnectionBuilder,
  DbConnectionImpl,
  DbContext,
  ErrorContextInterface,
  Event,
  EventContextInterface,
  Identity,
  ProductType,
  ProductTypeElement,
  ReducerEventContextInterface,
  SubscriptionBuilderImpl,
  SubscriptionEventContextInterface,
  SumType,
  SumTypeVariant,
  TableCache,
  TimeDuration,
  Timestamp,
  deepEqual,
} from "@clockworklabs/spacetimedb-sdk";

// Import and reexport all reducer arg types
import { Connect } from "./connect_reducer.ts";
export { Connect };
import { Disconnect } from "./disconnect_reducer.ts";
export { Disconnect };
import { UpdatePlayerPosition } from "./update_player_position_reducer.ts";
export { UpdatePlayerPosition };

// Import and reexport all table handle types
import { LoggedOutPlayerTableHandle } from "./logged_out_player_table.ts";
export { LoggedOutPlayerTableHandle };
import { PlayerTableHandle } from "./player_table.ts";
export { PlayerTableHandle };

// Import and reexport all types
import { DbVector2 } from "./db_vector_2_type.ts";
export { DbVector2 };
import { Player } from "./player_type.ts";
export { Player };

const REMOTE_MODULE = {
  tables: {
    logged_out_player: {
      tableName: "logged_out_player",
      rowType: Player.getTypeScriptAlgebraicType(),
      primaryKey: "identity",
    },
    player: {
      tableName: "player",
      rowType: Player.getTypeScriptAlgebraicType(),
      primaryKey: "identity",
    },
  },
  reducers: {
    connect: {
      reducerName: "connect",
      argsType: Connect.getTypeScriptAlgebraicType(),
    },
    disconnect: {
      reducerName: "disconnect",
      argsType: Disconnect.getTypeScriptAlgebraicType(),
    },
    update_player_position: {
      reducerName: "update_player_position",
      argsType: UpdatePlayerPosition.getTypeScriptAlgebraicType(),
    },
  },
  // Constructors which are used by the DbConnectionImpl to
  // extract type information from the generated RemoteModule.
  //
  // NOTE: This is not strictly necessary for `eventContextConstructor` because
  // all we do is build a TypeScript object which we could have done inside the
  // SDK, but if in the future we wanted to create a class this would be
  // necessary because classes have methods, so we'll keep it.
  eventContextConstructor: (imp: DbConnectionImpl, event: Event<Reducer>) => {
    return {
      ...(imp as DbConnection),
      event
    }
  },
  dbViewConstructor: (imp: DbConnectionImpl) => {
    return new RemoteTables(imp);
  },
  reducersConstructor: (imp: DbConnectionImpl, setReducerFlags: SetReducerFlags) => {
    return new RemoteReducers(imp, setReducerFlags);
  },
  setReducerFlagsConstructor: () => {
    return new SetReducerFlags();
  }
}

// A type representing all the possible variants of a reducer.
export type Reducer = never
| { name: "Connect", args: Connect }
| { name: "Disconnect", args: Disconnect }
| { name: "UpdatePlayerPosition", args: UpdatePlayerPosition }
;

export class RemoteReducers {
  constructor(private connection: DbConnectionImpl, private setCallReducerFlags: SetReducerFlags) {}

  onConnect(callback: (ctx: ReducerEventContext) => void) {
    this.connection.onReducer("connect", callback);
  }

  removeOnConnect(callback: (ctx: ReducerEventContext) => void) {
    this.connection.offReducer("connect", callback);
  }

  onDisconnect(callback: (ctx: ReducerEventContext) => void) {
    this.connection.onReducer("disconnect", callback);
  }

  removeOnDisconnect(callback: (ctx: ReducerEventContext) => void) {
    this.connection.offReducer("disconnect", callback);
  }

  updatePlayerPosition(position: DbVector2, rotation: number) {
    const __args = { position, rotation };
    let __writer = new BinaryWriter(1024);
    UpdatePlayerPosition.getTypeScriptAlgebraicType().serialize(__writer, __args);
    let __argsBuffer = __writer.getBuffer();
    this.connection.callReducer("update_player_position", __argsBuffer, this.setCallReducerFlags.updatePlayerPositionFlags);
  }

  onUpdatePlayerPosition(callback: (ctx: ReducerEventContext, position: DbVector2, rotation: number) => void) {
    this.connection.onReducer("update_player_position", callback);
  }

  removeOnUpdatePlayerPosition(callback: (ctx: ReducerEventContext, position: DbVector2, rotation: number) => void) {
    this.connection.offReducer("update_player_position", callback);
  }

}

export class SetReducerFlags {
  updatePlayerPositionFlags: CallReducerFlags = 'FullUpdate';
  updatePlayerPosition(flags: CallReducerFlags) {
    this.updatePlayerPositionFlags = flags;
  }

}

export class RemoteTables {
  constructor(private connection: DbConnectionImpl) {}

  get loggedOutPlayer(): LoggedOutPlayerTableHandle {
    return new LoggedOutPlayerTableHandle(this.connection.clientCache.getOrCreateTable<Player>(REMOTE_MODULE.tables.logged_out_player));
  }

  get player(): PlayerTableHandle {
    return new PlayerTableHandle(this.connection.clientCache.getOrCreateTable<Player>(REMOTE_MODULE.tables.player));
  }
}

export class SubscriptionBuilder extends SubscriptionBuilderImpl<RemoteTables, RemoteReducers, SetReducerFlags> { }

export class DbConnection extends DbConnectionImpl<RemoteTables, RemoteReducers, SetReducerFlags> {
  static builder = (): DbConnectionBuilder<DbConnection, ErrorContext, SubscriptionEventContext> => {
    return new DbConnectionBuilder<DbConnection, ErrorContext, SubscriptionEventContext>(REMOTE_MODULE, (imp: DbConnectionImpl) => imp as DbConnection);
  }
  subscriptionBuilder = (): SubscriptionBuilder => {
    return new SubscriptionBuilder(this);
  }
}

export type EventContext = EventContextInterface<RemoteTables, RemoteReducers, SetReducerFlags, Reducer>;
export type ReducerEventContext = ReducerEventContextInterface<RemoteTables, RemoteReducers, SetReducerFlags, Reducer>;
export type SubscriptionEventContext = SubscriptionEventContextInterface<RemoteTables, RemoteReducers, SetReducerFlags>;
export type ErrorContext = ErrorContextInterface<RemoteTables, RemoteReducers, SetReducerFlags>;
