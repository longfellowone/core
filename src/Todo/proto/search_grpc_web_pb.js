/**
 * @fileoverview gRPC-Web generated client stub for server
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.server = require('./search_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.server.searchClient = function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.server.searchPromiseClient = function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!proto.server.searchClient} The delegate callback based client
   */
  this.delegateClient_ = new proto.server.searchClient(
    hostname,
    credentials,
    options,
  );
};

/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.server.ProductSearchRequest,
 *   !proto.server.ProductSearchResponse>}
 */
const methodInfo_search_ProductSearch = new grpc.web.AbstractClientBase.MethodInfo(
  proto.server.ProductSearchResponse,
  /** @param {!proto.server.ProductSearchRequest} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.server.ProductSearchResponse.deserializeBinary,
);

/**
 * @param {!proto.server.ProductSearchRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.server.ProductSearchResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.server.ProductSearchResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.server.searchClient.prototype.productSearch = function(
  request,
  metadata,
  callback,
) {
  return this.client_.rpcCall(
    this.hostname_ + '/server.search/ProductSearch',
    request,
    metadata,
    methodInfo_search_ProductSearch,
    callback,
  );
};

/**
 * @param {!proto.server.ProductSearchRequest} request The
 *     request proto
 * @param {!Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.server.ProductSearchResponse>}
 *     The XHR Node Readable Stream
 */
proto.server.searchPromiseClient.prototype.productSearch = function(
  request,
  metadata,
) {
  return new Promise((resolve, reject) => {
    this.delegateClient_.productSearch(request, metadata, (error, response) => {
      error ? reject(error) : resolve(response);
    });
  });
};

module.exports = proto.server;
