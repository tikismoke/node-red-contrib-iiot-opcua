/**
 The BSD 3-Clause License

 Copyright 2016,2017 - Klaus Landsdorf (http://bianco-royal.de/)
 Copyright 2015,2016 - Mika Karaila, Valmet Automation Inc. (node-red-contrib-opcua)
 All rights reserved.
 node-red-contrib-iiot-opcua
 */
'use strict'

/**
 * Nested namespace settings.
 *
 * @type {{biancoroyal: {opcua: {iiot: {core: {client: {listener: {}}}}}}}}
 *
 * @Namesapce de.biancoroyal.opcua.iiot.core.client.listener
 */
var de = de || {biancoroyal: {opcua: {iiot: {core: {listener: {}}}}}} // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.core = de.biancoroyal.opcua.iiot.core.listener.core || require('./opcua-iiot-core') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.client = de.biancoroyal.opcua.iiot.core.listener.client || require('./opcua-iiot-core-client') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.internalDebugLog = de.biancoroyal.opcua.iiot.core.listener.internalDebugLog || require('debug')('opcuaIIoT:listener') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.detailDebugLog = de.biancoroyal.opcua.iiot.core.listener.detailDebugLog || require('debug')('opcuaIIoT:listener:details') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.subscribeDebugLog = de.biancoroyal.opcua.iiot.core.listener.subscribeDebugLog || require('debug')('opcuaIIoT:listener:subscribe') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.subscribeDetailDebugLog = de.biancoroyal.opcua.iiot.core.listener.subscribeDetailDebugLog || require('debug')('opcuaIIoT:listener:subscribe:details') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.eventDebugLog = de.biancoroyal.opcua.iiot.core.listener.eventDebugLog || require('debug')('opcuaIIoT:listener:event') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.eventDetailDebugLog = de.biancoroyal.opcua.iiot.core.listener.eventDetailDebugLog || require('debug')('opcuaIIoT:listener:event:details') // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.SUBSCRIBE_DEFAULT_INTERVAL = 1000 // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.MIN_LISTENER_INTERVAL = 100 // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.MAX_LISTENER_INTERVAL = 3600000 // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.SUBSCRIBE_DEFAULT_QUEUE_SIZE = 1 // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.EVENT_DEFAULT_INTERVAL = 250 // eslint-disable-line no-use-before-define
de.biancoroyal.opcua.iiot.core.listener.EVENT_DEFAULT_QUEUE_SIZE = 10000 // eslint-disable-line no-use-before-define

de.biancoroyal.opcua.iiot.core.listener.getEventSubscribtionParameters = function (timeMilliseconds) {
  return {
    requestedPublishingInterval: timeMilliseconds || 100,
    requestedLifetimeCount: 60,
    requestedMaxKeepAliveCount: 10,
    maxNotificationsPerPublish: 4,
    publishingEnabled: true,
    priority: 1
  }
}

de.biancoroyal.opcua.iiot.core.listener.getSubscriptionParameters = function (timeMilliseconds) {
  return {
    requestedPublishingInterval: timeMilliseconds || 100,
    requestedLifetimeCount: 1000,
    requestedMaxKeepAliveCount: 12,
    maxNotificationsPerPublish: 10,
    publishingEnabled: true,
    priority: 10
  }
}

de.biancoroyal.opcua.iiot.core.listener.collectAlarmFields = function (field, key, value) {
  let eventInformation = {}

  this.eventDetailDebugLog('collectAlarmFields -> field: ' + field + ' key: ' + key + ' value: ' + JSON.stringify(value))

  switch (field) {
    // Common fields
    case 'EventId':
      eventInformation.eventId = value
      break
    case 'EventType':
      eventInformation.eventType = value
      break
    case 'SourceNode':
      eventInformation.ssourceNode = value
      break
    case 'SourceName':
      eventInformation.sourceName = value
      break
    case 'Time':
      eventInformation.time = value
      break
    case 'ReceiveTime':
      eventInformation.receiveTime = value
      break
    case 'Message':
      eventInformation.message = value.text
      break
    case 'Severity':
      eventInformation.severity = value
      break

    // ConditionType
    case 'ConditionClassId':
      eventInformation.conditionClassId = value
      break
    case 'ConditionClassName':
      eventInformation.conditionClassNameName = value
      break
    case 'ConditionName':
      eventInformation.conditionName = value
      break
    case 'BranchId':
      eventInformation.branchId = value
      break
    case 'Retain':
      eventInformation.retain = value
      break
    case 'EnabledState':
      eventInformation.enabledState = value.text
      break
    case 'Quality':
      eventInformation.quality = value
      break
    case 'LastSeverity':
      eventInformation.lastSeverity = value
      break
    case 'Comment':
      eventInformation.comment = value.text
      break
    case 'ClientUserId':
      eventInformation.clientUserId = value
      break

    // AcknowledgeConditionType
    case 'AckedState':
      eventInformation.ackedState = value.text
      break
    case 'ConfirmedState':
      eventInformation.confirmedState = value.text
      break

    // AlarmConditionType
    case 'ActiveState':
      eventInformation.activeState = value.text
      break
    case 'InputNode':
      eventInformation.inputNode = value
      break
    case 'SupressedState':
      eventInformation.supressedState = value.text
      break

    // Limits
    case 'HighHighLimit':
      eventInformation.highHighLimit = value
      break
    case 'HighLimit':
      eventInformation.highLimit = value
      break
    case 'LowLimit':
      eventInformation.lowLimit = value
      break
    case 'LowLowLimit':
      eventInformation.lowLowLimit = value
      break
    case 'Value':
      eventInformation.value = value
      break
    default:
      eventInformation.field = {}
      eventInformation.field.name = field
      eventInformation.field.value = value

      if (value.text) {
        eventInformation.field.value.text = value.text
      }
      break
  }

  return eventInformation
}

de.biancoroyal.opcua.iiot.core.listener.getBasicEventFields = function () {
  return [
    'EventId',
    'ConditionName',
    'ConditionClassName',
    'ConditionClassId',
    'SourceName',
    'SourceNode',
    'BranchId',
    'EventType',
    'ReceiveTime',
    'Severity',
    'Message',
    'Retain',
    'Comment',
    'Comment.SourceTimestamp',
    'EnabledState',
    'EnabledState.Id',
    'EnabledState.EffectiveDisplayName',
    'EnabledState.TransitionTime',
    'LastSeverity',
    'LastSeverity.SourceTimestamp',
    'Quality',
    'Quality.SourceTimestamp',
    'Time',
    'ClientUserId',
    'AckedState',
    'AckedState.Id',
    'ConfirmedState',
    'ConfirmedState.Id',
    'LimitState',
    'LimitState.Id',
    'ActiveState',
    'ActiveState.Id'
  ]
}

de.biancoroyal.opcua.iiot.core.listener.getConditionEventFields = function () {
  return [
    'ConditionName',
    'ConditionType',
    'ConditionClassId',
    'ConditionClassName',
    'ConditionVariableType',
    'Message',
    'SourceName',
    'SourceNode',
    'BranchId',
    'EventType',
    'ReceiveTime'
  ]
}

de.biancoroyal.opcua.iiot.core.listener.MonitoredItemSet = function () {
  let Set = require('collections/set')
  return new Set(null, function (a, b) {
    return a.topicName === b.topicName
  }, function (object) {
    return object.topicName
  })
}

de.biancoroyal.opcua.iiot.core.listener.buildNewMonitoredItem = function (msg, subscription, handleErrorCallback) {
  let interval
  let queueSize

  if (typeof msg.payload.interval === 'number' &&
    msg.payload.interval <= this.MAX_LISTENER_INTERVAL &&
    msg.payload.interval >= this.MIN_LISTENER_INTERVAL) {
    interval = parseInt(msg.payload.interval)
  } else {
    interval = this.SUBSCRIBE_DEFAULT_INTERVAL
  }

  if (msg.payload.queueSize && typeof msg.payload.queueSize === 'number') {
    queueSize = parseInt(msg.payload.queueSize)
  } else {
    queueSize = this.SUBSCRIBE_DEFAULT_QUEUE_SIZE
  }

  return subscription.monitor(
    {
      nodeId: this.core.nodeOPCUA.resolveNodeId(msg.topic),
      attributeId: this.core.nodeOPCUA.AttributeIds.Value,
      origin: msg
    },
    {
      samplingInterval: interval,
      discardOldest: true,
      queueSize: queueSize
    },
    this.core.nodeOPCUA.read_service.TimestampsToReturn.Both,
    handleErrorCallback
  )
}

de.biancoroyal.opcua.iiot.core.listener.buildNewEventItem = function (msg, subscription, handleErrorCallback) {
  let interval
  let queueSize

  if (typeof msg.payload.interval === 'number' && msg.payload.interval < this.MAX_LISTENER_INTERVAL) {
    interval = parseInt(msg.payload.interval)
  } else {
    interval = this.EVENT_DEFAULT_INTERVAL
  }

  if (typeof msg.payload.queueSize === 'number') {
    queueSize = parseInt(msg.payload.queueSize)
  } else {
    queueSize = this.EVENT_DEFAULT_QUEUE_SIZE
  }

  return subscription.monitor(
    {
      nodeId: this.core.nodeOPCUA.resolveNodeId(msg.topic),
      attributeId: this.core.nodeOPCUA.AttributeIds.EventNotifier,
      origin: msg
    },
    {
      samplingInterval: interval,
      discardOldest: true,
      queueSize: queueSize,
      filter: msg.payload.eventFilter
    },
    this.core.nodeOPCUA.read_service.TimestampsToReturn.Both,
    handleErrorCallback
  )
}

de.biancoroyal.opcua.iiot.core.listener.getAllEventTypes = function (session, callback) {
  let entries = []
  let makeNodeId = this.core.nodeOPCUA.makeNodeId
  let ObjectTypeIds = this.core.nodeOPCUA.ObjectTypeIds

  let browseEventTypes = {
    nodeId: makeNodeId(ObjectTypeIds.BaseEventType),
    referenceTypeId: this.core.nodeOPCUA.resolveNodeId('HasSubtype'),
    browseDirection: this.core.nodeOPCUA.browse_service.BrowseDirection.Forward,
    includeSubtypes: true,
    nodeClassMask: this.core.nodeOPCUA.browse_service.NodeClassMask.ObjectType,
    resultMask: 63 // All ResultMask_Schema
  }

  let nodesToBrowse = [browseEventTypes]

  session.browse(nodesToBrowse, function (err, results, diagnostics) {
    if (err) { callback(err) }
    results[0].references.forEach(function (reference) {
      entries.push({displayName: reference.displayName.text, nodeId: reference.nodeId, reference: reference})
    })

    callback(null, entries, diagnostics)
  })
}

de.biancoroyal.opcua.iiot.core.listener.analyzeEvent = function (session, browseForBrowseName, eventFields, response) {
  let core = de.biancoroyal.opcua.iiot.core.listener.core
  let coreListener = de.biancoroyal.opcua.iiot.core.listener

  return new Promise(
    function (resolve, reject) {
      if (!response) {
        reject(new Error('Event Response Not Valid'))
      } else {
        let index = 0
        let eventInformation = {}
        let variantMsg = {payload: []}
        let msg = {payload: []}

        response.forEach(function (variant) {
          coreListener.eventDebugLog('variant entry: ' + variant.toString())

          try {
            if (variant.dataType && variant.value) {
              eventInformation = coreListener.collectAlarmFields(eventFields[index], variant.dataType.key.toString(), variant.value)

              if (variant.dataType === core.nodeOPCUA.DataType.NodeId) {
                browseForBrowseName(session, variant.value, function (err, browseName) {
                  if (err) {
                    reject(err)
                  } else {
                    eventInformation.browseName = browseName
                    msg.payload.push(eventInformation)
                    variantMsg.payload.push(variant.toJSON())
                  }
                })
              } else {
                msg.payload.push(eventInformation)
                variantMsg.payload.push(variant.toJSON())
              }
            }
            index++
          } catch (err) {
            eventInformation = {error: err}
            msg.payload.push(eventInformation)
            variantMsg.payload.push(variant.toJSON())
          }
        })

        resolve({message: msg, variantMsg: variantMsg})
      }
    }
  )
}

module.exports = de.biancoroyal.opcua.iiot.core.listener
