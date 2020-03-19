// Generated from MySQLParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by MySQLParser.

function MySQLParserVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

MySQLParserVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
MySQLParserVisitor.prototype.constructor = MySQLParserVisitor;

// Visit a parse tree produced by MySQLParser#query.
MySQLParserVisitor.prototype.visitQuery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleStatement.
MySQLParserVisitor.prototype.visitSimpleStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterStatement.
MySQLParserVisitor.prototype.visitAlterStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterDatabase.
MySQLParserVisitor.prototype.visitAlterDatabase = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterEvent.
MySQLParserVisitor.prototype.visitAlterEvent = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterLogfileGroup.
MySQLParserVisitor.prototype.visitAlterLogfileGroup = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterLogfileGroupOptions.
MySQLParserVisitor.prototype.visitAlterLogfileGroupOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterLogfileGroupOption.
MySQLParserVisitor.prototype.visitAlterLogfileGroupOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterServer.
MySQLParserVisitor.prototype.visitAlterServer = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterTable.
MySQLParserVisitor.prototype.visitAlterTable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterTableActions.
MySQLParserVisitor.prototype.visitAlterTableActions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterCommandList.
MySQLParserVisitor.prototype.visitAlterCommandList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterCommandsModifierList.
MySQLParserVisitor.prototype.visitAlterCommandsModifierList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#standaloneAlterCommands.
MySQLParserVisitor.prototype.visitStandaloneAlterCommands = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterPartition.
MySQLParserVisitor.prototype.visitAlterPartition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterList.
MySQLParserVisitor.prototype.visitAlterList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterCommandsModifier.
MySQLParserVisitor.prototype.visitAlterCommandsModifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterListItem.
MySQLParserVisitor.prototype.visitAlterListItem = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#place.
MySQLParserVisitor.prototype.visitPlace = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#restrict.
MySQLParserVisitor.prototype.visitRestrict = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterOrderList.
MySQLParserVisitor.prototype.visitAlterOrderList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterAlgorithmOption.
MySQLParserVisitor.prototype.visitAlterAlgorithmOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterLockOption.
MySQLParserVisitor.prototype.visitAlterLockOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexLockAndAlgorithm.
MySQLParserVisitor.prototype.visitIndexLockAndAlgorithm = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#withValidation.
MySQLParserVisitor.prototype.visitWithValidation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#removePartitioning.
MySQLParserVisitor.prototype.visitRemovePartitioning = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#allOrPartitionNameList.
MySQLParserVisitor.prototype.visitAllOrPartitionNameList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#reorgPartitionRule.
MySQLParserVisitor.prototype.visitReorgPartitionRule = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterTablespace.
MySQLParserVisitor.prototype.visitAlterTablespace = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterUndoTablespace.
MySQLParserVisitor.prototype.visitAlterUndoTablespace = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#undoTableSpaceOptions.
MySQLParserVisitor.prototype.visitUndoTableSpaceOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#undoTableSpaceOption.
MySQLParserVisitor.prototype.visitUndoTableSpaceOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterTablespaceOptions.
MySQLParserVisitor.prototype.visitAlterTablespaceOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterTablespaceOption.
MySQLParserVisitor.prototype.visitAlterTablespaceOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#changeTablespaceOption.
MySQLParserVisitor.prototype.visitChangeTablespaceOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterView.
MySQLParserVisitor.prototype.visitAlterView = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#viewTail.
MySQLParserVisitor.prototype.visitViewTail = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#viewSelect.
MySQLParserVisitor.prototype.visitViewSelect = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#viewCheckOption.
MySQLParserVisitor.prototype.visitViewCheckOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createStatement.
MySQLParserVisitor.prototype.visitCreateStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createDatabase.
MySQLParserVisitor.prototype.visitCreateDatabase = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createDatabaseOption.
MySQLParserVisitor.prototype.visitCreateDatabaseOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createTable.
MySQLParserVisitor.prototype.visitCreateTable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableElementList.
MySQLParserVisitor.prototype.visitTableElementList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableElement.
MySQLParserVisitor.prototype.visitTableElement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#duplicateAsQueryExpression.
MySQLParserVisitor.prototype.visitDuplicateAsQueryExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#queryExpressionOrParens.
MySQLParserVisitor.prototype.visitQueryExpressionOrParens = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createRoutine.
MySQLParserVisitor.prototype.visitCreateRoutine = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createProcedure.
MySQLParserVisitor.prototype.visitCreateProcedure = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createFunction.
MySQLParserVisitor.prototype.visitCreateFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createUdf.
MySQLParserVisitor.prototype.visitCreateUdf = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#routineCreateOption.
MySQLParserVisitor.prototype.visitRoutineCreateOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#routineAlterOptions.
MySQLParserVisitor.prototype.visitRoutineAlterOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#routineOption.
MySQLParserVisitor.prototype.visitRoutineOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createIndex.
MySQLParserVisitor.prototype.visitCreateIndex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexNameAndType.
MySQLParserVisitor.prototype.visitIndexNameAndType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createIndexTarget.
MySQLParserVisitor.prototype.visitCreateIndexTarget = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createLogfileGroup.
MySQLParserVisitor.prototype.visitCreateLogfileGroup = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#logfileGroupOptions.
MySQLParserVisitor.prototype.visitLogfileGroupOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#logfileGroupOption.
MySQLParserVisitor.prototype.visitLogfileGroupOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createServer.
MySQLParserVisitor.prototype.visitCreateServer = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#serverOptions.
MySQLParserVisitor.prototype.visitServerOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#serverOption.
MySQLParserVisitor.prototype.visitServerOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createTablespace.
MySQLParserVisitor.prototype.visitCreateTablespace = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createUndoTablespace.
MySQLParserVisitor.prototype.visitCreateUndoTablespace = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsDataFileName.
MySQLParserVisitor.prototype.visitTsDataFileName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsDataFile.
MySQLParserVisitor.prototype.visitTsDataFile = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tablespaceOptions.
MySQLParserVisitor.prototype.visitTablespaceOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tablespaceOption.
MySQLParserVisitor.prototype.visitTablespaceOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsOptionInitialSize.
MySQLParserVisitor.prototype.visitTsOptionInitialSize = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsOptionUndoRedoBufferSize.
MySQLParserVisitor.prototype.visitTsOptionUndoRedoBufferSize = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsOptionAutoextendSize.
MySQLParserVisitor.prototype.visitTsOptionAutoextendSize = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsOptionMaxSize.
MySQLParserVisitor.prototype.visitTsOptionMaxSize = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsOptionExtentSize.
MySQLParserVisitor.prototype.visitTsOptionExtentSize = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsOptionNodegroup.
MySQLParserVisitor.prototype.visitTsOptionNodegroup = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsOptionEngine.
MySQLParserVisitor.prototype.visitTsOptionEngine = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsOptionWait.
MySQLParserVisitor.prototype.visitTsOptionWait = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsOptionComment.
MySQLParserVisitor.prototype.visitTsOptionComment = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsOptionFileblockSize.
MySQLParserVisitor.prototype.visitTsOptionFileblockSize = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tsOptionEncryption.
MySQLParserVisitor.prototype.visitTsOptionEncryption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createView.
MySQLParserVisitor.prototype.visitCreateView = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#viewReplaceOrAlgorithm.
MySQLParserVisitor.prototype.visitViewReplaceOrAlgorithm = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#viewAlgorithm.
MySQLParserVisitor.prototype.visitViewAlgorithm = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#viewSuid.
MySQLParserVisitor.prototype.visitViewSuid = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createTrigger.
MySQLParserVisitor.prototype.visitCreateTrigger = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#triggerFollowsPrecedesClause.
MySQLParserVisitor.prototype.visitTriggerFollowsPrecedesClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createEvent.
MySQLParserVisitor.prototype.visitCreateEvent = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createRole.
MySQLParserVisitor.prototype.visitCreateRole = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createSpatialReference.
MySQLParserVisitor.prototype.visitCreateSpatialReference = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#srsAttribute.
MySQLParserVisitor.prototype.visitSrsAttribute = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropStatement.
MySQLParserVisitor.prototype.visitDropStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropDatabase.
MySQLParserVisitor.prototype.visitDropDatabase = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropEvent.
MySQLParserVisitor.prototype.visitDropEvent = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropFunction.
MySQLParserVisitor.prototype.visitDropFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropProcedure.
MySQLParserVisitor.prototype.visitDropProcedure = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropIndex.
MySQLParserVisitor.prototype.visitDropIndex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropLogfileGroup.
MySQLParserVisitor.prototype.visitDropLogfileGroup = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropLogfileGroupOption.
MySQLParserVisitor.prototype.visitDropLogfileGroupOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropServer.
MySQLParserVisitor.prototype.visitDropServer = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropTable.
MySQLParserVisitor.prototype.visitDropTable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropTableSpace.
MySQLParserVisitor.prototype.visitDropTableSpace = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropTrigger.
MySQLParserVisitor.prototype.visitDropTrigger = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropView.
MySQLParserVisitor.prototype.visitDropView = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropRole.
MySQLParserVisitor.prototype.visitDropRole = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropSpatialReference.
MySQLParserVisitor.prototype.visitDropSpatialReference = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropUndoTablespace.
MySQLParserVisitor.prototype.visitDropUndoTablespace = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#renameTableStatement.
MySQLParserVisitor.prototype.visitRenameTableStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#renamePair.
MySQLParserVisitor.prototype.visitRenamePair = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#truncateTableStatement.
MySQLParserVisitor.prototype.visitTruncateTableStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#importStatement.
MySQLParserVisitor.prototype.visitImportStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#callStatement.
MySQLParserVisitor.prototype.visitCallStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#deleteStatement.
MySQLParserVisitor.prototype.visitDeleteStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#partitionDelete.
MySQLParserVisitor.prototype.visitPartitionDelete = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#deleteStatementOption.
MySQLParserVisitor.prototype.visitDeleteStatementOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#doStatement.
MySQLParserVisitor.prototype.visitDoStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#handlerStatement.
MySQLParserVisitor.prototype.visitHandlerStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#handlerReadOrScan.
MySQLParserVisitor.prototype.visitHandlerReadOrScan = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#insertStatement.
MySQLParserVisitor.prototype.visitInsertStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#insertLockOption.
MySQLParserVisitor.prototype.visitInsertLockOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#insertFromConstructor.
MySQLParserVisitor.prototype.visitInsertFromConstructor = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fields.
MySQLParserVisitor.prototype.visitFields = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#insertValues.
MySQLParserVisitor.prototype.visitInsertValues = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#insertQueryExpression.
MySQLParserVisitor.prototype.visitInsertQueryExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#valueList.
MySQLParserVisitor.prototype.visitValueList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#values.
MySQLParserVisitor.prototype.visitValues = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#valuesReference.
MySQLParserVisitor.prototype.visitValuesReference = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#insertUpdateList.
MySQLParserVisitor.prototype.visitInsertUpdateList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#loadStatement.
MySQLParserVisitor.prototype.visitLoadStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dataOrXml.
MySQLParserVisitor.prototype.visitDataOrXml = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#xmlRowsIdentifiedBy.
MySQLParserVisitor.prototype.visitXmlRowsIdentifiedBy = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#loadDataFileTail.
MySQLParserVisitor.prototype.visitLoadDataFileTail = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#loadDataFileTargetList.
MySQLParserVisitor.prototype.visitLoadDataFileTargetList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fieldOrVariableList.
MySQLParserVisitor.prototype.visitFieldOrVariableList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#replaceStatement.
MySQLParserVisitor.prototype.visitReplaceStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#selectStatement.
MySQLParserVisitor.prototype.visitSelectStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#selectStatementWithInto.
MySQLParserVisitor.prototype.visitSelectStatementWithInto = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#queryExpression.
MySQLParserVisitor.prototype.visitQueryExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#queryExpressionBody.
MySQLParserVisitor.prototype.visitQueryExpressionBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#queryExpressionParens.
MySQLParserVisitor.prototype.visitQueryExpressionParens = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#querySpecification.
MySQLParserVisitor.prototype.visitQuerySpecification = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#subquery.
MySQLParserVisitor.prototype.visitSubquery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#querySpecOption.
MySQLParserVisitor.prototype.visitQuerySpecOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#limitClause.
MySQLParserVisitor.prototype.visitLimitClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleLimitClause.
MySQLParserVisitor.prototype.visitSimpleLimitClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#limitOptions.
MySQLParserVisitor.prototype.visitLimitOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#limitOption.
MySQLParserVisitor.prototype.visitLimitOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#intoClause.
MySQLParserVisitor.prototype.visitIntoClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#procedureAnalyseClause.
MySQLParserVisitor.prototype.visitProcedureAnalyseClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#havingClause.
MySQLParserVisitor.prototype.visitHavingClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowClause.
MySQLParserVisitor.prototype.visitWindowClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowDefinition.
MySQLParserVisitor.prototype.visitWindowDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowSpec.
MySQLParserVisitor.prototype.visitWindowSpec = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowSpecDetails.
MySQLParserVisitor.prototype.visitWindowSpecDetails = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowFrameClause.
MySQLParserVisitor.prototype.visitWindowFrameClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowFrameUnits.
MySQLParserVisitor.prototype.visitWindowFrameUnits = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowFrameExtent.
MySQLParserVisitor.prototype.visitWindowFrameExtent = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowFrameStart.
MySQLParserVisitor.prototype.visitWindowFrameStart = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowFrameBetween.
MySQLParserVisitor.prototype.visitWindowFrameBetween = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowFrameBound.
MySQLParserVisitor.prototype.visitWindowFrameBound = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowFrameExclusion.
MySQLParserVisitor.prototype.visitWindowFrameExclusion = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#withClause.
MySQLParserVisitor.prototype.visitWithClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#commonTableExpression.
MySQLParserVisitor.prototype.visitCommonTableExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#groupByClause.
MySQLParserVisitor.prototype.visitGroupByClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#olapOption.
MySQLParserVisitor.prototype.visitOlapOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#orderClause.
MySQLParserVisitor.prototype.visitOrderClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#direction.
MySQLParserVisitor.prototype.visitDirection = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fromClause.
MySQLParserVisitor.prototype.visitFromClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableReferenceList.
MySQLParserVisitor.prototype.visitTableReferenceList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#selectOption.
MySQLParserVisitor.prototype.visitSelectOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#lockingClause.
MySQLParserVisitor.prototype.visitLockingClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#lockStrengh.
MySQLParserVisitor.prototype.visitLockStrengh = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#lockedRowAction.
MySQLParserVisitor.prototype.visitLockedRowAction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#selectItemList.
MySQLParserVisitor.prototype.visitSelectItemList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#selectItem.
MySQLParserVisitor.prototype.visitSelectItem = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#selectAlias.
MySQLParserVisitor.prototype.visitSelectAlias = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#whereClause.
MySQLParserVisitor.prototype.visitWhereClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableReference.
MySQLParserVisitor.prototype.visitTableReference = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#escapedTableReference.
MySQLParserVisitor.prototype.visitEscapedTableReference = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#joinedTable.
MySQLParserVisitor.prototype.visitJoinedTable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#naturalJoinType.
MySQLParserVisitor.prototype.visitNaturalJoinType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#innerJoinType.
MySQLParserVisitor.prototype.visitInnerJoinType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#outerJoinType.
MySQLParserVisitor.prototype.visitOuterJoinType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableFactor.
MySQLParserVisitor.prototype.visitTableFactor = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#singleTable.
MySQLParserVisitor.prototype.visitSingleTable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#singleTableParens.
MySQLParserVisitor.prototype.visitSingleTableParens = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#derivedTable.
MySQLParserVisitor.prototype.visitDerivedTable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableReferenceListParens.
MySQLParserVisitor.prototype.visitTableReferenceListParens = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableFunction.
MySQLParserVisitor.prototype.visitTableFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#columnsClause.
MySQLParserVisitor.prototype.visitColumnsClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#jtColumn.
MySQLParserVisitor.prototype.visitJtColumn = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#onEmptyOrError.
MySQLParserVisitor.prototype.visitOnEmptyOrError = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#onEmpty.
MySQLParserVisitor.prototype.visitOnEmpty = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#onError.
MySQLParserVisitor.prototype.visitOnError = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#jtOnResponse.
MySQLParserVisitor.prototype.visitJtOnResponse = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#unionOption.
MySQLParserVisitor.prototype.visitUnionOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableAlias.
MySQLParserVisitor.prototype.visitTableAlias = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexHintList.
MySQLParserVisitor.prototype.visitIndexHintList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexHint.
MySQLParserVisitor.prototype.visitIndexHint = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexHintType.
MySQLParserVisitor.prototype.visitIndexHintType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#keyOrIndex.
MySQLParserVisitor.prototype.visitKeyOrIndex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#constraintKeyType.
MySQLParserVisitor.prototype.visitConstraintKeyType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexHintClause.
MySQLParserVisitor.prototype.visitIndexHintClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexList.
MySQLParserVisitor.prototype.visitIndexList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexListElement.
MySQLParserVisitor.prototype.visitIndexListElement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#updateStatement.
MySQLParserVisitor.prototype.visitUpdateStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#transactionOrLockingStatement.
MySQLParserVisitor.prototype.visitTransactionOrLockingStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#transactionStatement.
MySQLParserVisitor.prototype.visitTransactionStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#beginWork.
MySQLParserVisitor.prototype.visitBeginWork = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#transactionCharacteristic.
MySQLParserVisitor.prototype.visitTransactionCharacteristic = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#savepointStatement.
MySQLParserVisitor.prototype.visitSavepointStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#lockStatement.
MySQLParserVisitor.prototype.visitLockStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#lockItem.
MySQLParserVisitor.prototype.visitLockItem = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#lockOption.
MySQLParserVisitor.prototype.visitLockOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#xaStatement.
MySQLParserVisitor.prototype.visitXaStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#xaConvert.
MySQLParserVisitor.prototype.visitXaConvert = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#xid.
MySQLParserVisitor.prototype.visitXid = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#replicationStatement.
MySQLParserVisitor.prototype.visitReplicationStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#resetOption.
MySQLParserVisitor.prototype.visitResetOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#masterResetOptions.
MySQLParserVisitor.prototype.visitMasterResetOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#replicationLoad.
MySQLParserVisitor.prototype.visitReplicationLoad = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#changeMaster.
MySQLParserVisitor.prototype.visitChangeMaster = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#changeMasterOptions.
MySQLParserVisitor.prototype.visitChangeMasterOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#masterOption.
MySQLParserVisitor.prototype.visitMasterOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#privilegeCheckDef.
MySQLParserVisitor.prototype.visitPrivilegeCheckDef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#masterTlsCiphersuitesDef.
MySQLParserVisitor.prototype.visitMasterTlsCiphersuitesDef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#masterFileDef.
MySQLParserVisitor.prototype.visitMasterFileDef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#serverIdList.
MySQLParserVisitor.prototype.visitServerIdList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#changeReplication.
MySQLParserVisitor.prototype.visitChangeReplication = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#filterDefinition.
MySQLParserVisitor.prototype.visitFilterDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#filterDbList.
MySQLParserVisitor.prototype.visitFilterDbList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#filterTableList.
MySQLParserVisitor.prototype.visitFilterTableList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#filterStringList.
MySQLParserVisitor.prototype.visitFilterStringList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#filterWildDbTableString.
MySQLParserVisitor.prototype.visitFilterWildDbTableString = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#filterDbPairList.
MySQLParserVisitor.prototype.visitFilterDbPairList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#slave.
MySQLParserVisitor.prototype.visitSlave = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#slaveUntilOptions.
MySQLParserVisitor.prototype.visitSlaveUntilOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#slaveConnectionOptions.
MySQLParserVisitor.prototype.visitSlaveConnectionOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#slaveThreadOptions.
MySQLParserVisitor.prototype.visitSlaveThreadOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#slaveThreadOption.
MySQLParserVisitor.prototype.visitSlaveThreadOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#groupReplication.
MySQLParserVisitor.prototype.visitGroupReplication = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#preparedStatement.
MySQLParserVisitor.prototype.visitPreparedStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#executeStatement.
MySQLParserVisitor.prototype.visitExecuteStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#executeVarList.
MySQLParserVisitor.prototype.visitExecuteVarList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#cloneStatement.
MySQLParserVisitor.prototype.visitCloneStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dataDirSSL.
MySQLParserVisitor.prototype.visitDataDirSSL = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#ssl.
MySQLParserVisitor.prototype.visitSsl = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#accountManagementStatement.
MySQLParserVisitor.prototype.visitAccountManagementStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterUser.
MySQLParserVisitor.prototype.visitAlterUser = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterUserTail.
MySQLParserVisitor.prototype.visitAlterUserTail = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#userFunction.
MySQLParserVisitor.prototype.visitUserFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createUser.
MySQLParserVisitor.prototype.visitCreateUser = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createUserTail.
MySQLParserVisitor.prototype.visitCreateUserTail = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#defaultRoleClause.
MySQLParserVisitor.prototype.visitDefaultRoleClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#requireClause.
MySQLParserVisitor.prototype.visitRequireClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#connectOptions.
MySQLParserVisitor.prototype.visitConnectOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#accountLockPasswordExpireOptions.
MySQLParserVisitor.prototype.visitAccountLockPasswordExpireOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropUser.
MySQLParserVisitor.prototype.visitDropUser = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#grant.
MySQLParserVisitor.prototype.visitGrant = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#grantTargetList.
MySQLParserVisitor.prototype.visitGrantTargetList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#grantOptions.
MySQLParserVisitor.prototype.visitGrantOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#exceptRoleList.
MySQLParserVisitor.prototype.visitExceptRoleList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#withRoles.
MySQLParserVisitor.prototype.visitWithRoles = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#grantAs.
MySQLParserVisitor.prototype.visitGrantAs = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#versionedRequireClause.
MySQLParserVisitor.prototype.visitVersionedRequireClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#renameUser.
MySQLParserVisitor.prototype.visitRenameUser = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#revoke.
MySQLParserVisitor.prototype.visitRevoke = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#onTypeTo.
MySQLParserVisitor.prototype.visitOnTypeTo = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#aclType.
MySQLParserVisitor.prototype.visitAclType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#roleOrPrivilegesList.
MySQLParserVisitor.prototype.visitRoleOrPrivilegesList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#roleOrPrivilege.
MySQLParserVisitor.prototype.visitRoleOrPrivilege = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#grantIdentifier.
MySQLParserVisitor.prototype.visitGrantIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#requireList.
MySQLParserVisitor.prototype.visitRequireList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#requireListElement.
MySQLParserVisitor.prototype.visitRequireListElement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#grantOption.
MySQLParserVisitor.prototype.visitGrantOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#setRole.
MySQLParserVisitor.prototype.visitSetRole = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#roleList.
MySQLParserVisitor.prototype.visitRoleList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#role.
MySQLParserVisitor.prototype.visitRole = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableAdministrationStatement.
MySQLParserVisitor.prototype.visitTableAdministrationStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#histogram.
MySQLParserVisitor.prototype.visitHistogram = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#checkOption.
MySQLParserVisitor.prototype.visitCheckOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#repairType.
MySQLParserVisitor.prototype.visitRepairType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#installUninstallStatment.
MySQLParserVisitor.prototype.visitInstallUninstallStatment = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#setStatement.
MySQLParserVisitor.prototype.visitSetStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#startOptionValueList.
MySQLParserVisitor.prototype.visitStartOptionValueList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#transactionCharacteristics.
MySQLParserVisitor.prototype.visitTransactionCharacteristics = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#transactionAccessMode.
MySQLParserVisitor.prototype.visitTransactionAccessMode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#isolationLevel.
MySQLParserVisitor.prototype.visitIsolationLevel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#optionValueListContinued.
MySQLParserVisitor.prototype.visitOptionValueListContinued = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#optionValueNoOptionType.
MySQLParserVisitor.prototype.visitOptionValueNoOptionType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#optionValue.
MySQLParserVisitor.prototype.visitOptionValue = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#setSystemVariable.
MySQLParserVisitor.prototype.visitSetSystemVariable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#startOptionValueListFollowingOptionType.
MySQLParserVisitor.prototype.visitStartOptionValueListFollowingOptionType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#optionValueFollowingOptionType.
MySQLParserVisitor.prototype.visitOptionValueFollowingOptionType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#setExprOrDefault.
MySQLParserVisitor.prototype.visitSetExprOrDefault = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#showStatement.
MySQLParserVisitor.prototype.visitShowStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#showCommandType.
MySQLParserVisitor.prototype.visitShowCommandType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#nonBlocking.
MySQLParserVisitor.prototype.visitNonBlocking = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fromOrIn.
MySQLParserVisitor.prototype.visitFromOrIn = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#inDb.
MySQLParserVisitor.prototype.visitInDb = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#profileType.
MySQLParserVisitor.prototype.visitProfileType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#otherAdministrativeStatement.
MySQLParserVisitor.prototype.visitOtherAdministrativeStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#keyCacheListOrParts.
MySQLParserVisitor.prototype.visitKeyCacheListOrParts = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#keyCacheList.
MySQLParserVisitor.prototype.visitKeyCacheList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#assignToKeycache.
MySQLParserVisitor.prototype.visitAssignToKeycache = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#assignToKeycachePartition.
MySQLParserVisitor.prototype.visitAssignToKeycachePartition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#cacheKeyList.
MySQLParserVisitor.prototype.visitCacheKeyList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#keyUsageElement.
MySQLParserVisitor.prototype.visitKeyUsageElement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#keyUsageList.
MySQLParserVisitor.prototype.visitKeyUsageList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#flushOption.
MySQLParserVisitor.prototype.visitFlushOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#logType.
MySQLParserVisitor.prototype.visitLogType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#flushTables.
MySQLParserVisitor.prototype.visitFlushTables = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#flushTablesOptions.
MySQLParserVisitor.prototype.visitFlushTablesOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#preloadTail.
MySQLParserVisitor.prototype.visitPreloadTail = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#preloadList.
MySQLParserVisitor.prototype.visitPreloadList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#preloadKeys.
MySQLParserVisitor.prototype.visitPreloadKeys = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#adminPartition.
MySQLParserVisitor.prototype.visitAdminPartition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#resourceGroupManagement.
MySQLParserVisitor.prototype.visitResourceGroupManagement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createResourceGroup.
MySQLParserVisitor.prototype.visitCreateResourceGroup = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#resourceGroupVcpuList.
MySQLParserVisitor.prototype.visitResourceGroupVcpuList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#vcpuNumOrRange.
MySQLParserVisitor.prototype.visitVcpuNumOrRange = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#resourceGroupPriority.
MySQLParserVisitor.prototype.visitResourceGroupPriority = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#resourceGroupEnableDisable.
MySQLParserVisitor.prototype.visitResourceGroupEnableDisable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterResourceGroup.
MySQLParserVisitor.prototype.visitAlterResourceGroup = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#setResourceGroup.
MySQLParserVisitor.prototype.visitSetResourceGroup = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#threadIdList.
MySQLParserVisitor.prototype.visitThreadIdList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dropResourceGroup.
MySQLParserVisitor.prototype.visitDropResourceGroup = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#utilityStatement.
MySQLParserVisitor.prototype.visitUtilityStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#describeCommand.
MySQLParserVisitor.prototype.visitDescribeCommand = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#explainCommand.
MySQLParserVisitor.prototype.visitExplainCommand = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#explainableStatement.
MySQLParserVisitor.prototype.visitExplainableStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#helpCommand.
MySQLParserVisitor.prototype.visitHelpCommand = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#useCommand.
MySQLParserVisitor.prototype.visitUseCommand = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#restartServer.
MySQLParserVisitor.prototype.visitRestartServer = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#exprOr.
MySQLParserVisitor.prototype.visitExprOr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#exprNot.
MySQLParserVisitor.prototype.visitExprNot = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#exprIs.
MySQLParserVisitor.prototype.visitExprIs = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#exprAnd.
MySQLParserVisitor.prototype.visitExprAnd = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#exprXor.
MySQLParserVisitor.prototype.visitExprXor = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#primaryExprPredicate.
MySQLParserVisitor.prototype.visitPrimaryExprPredicate = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#primaryExprCompare.
MySQLParserVisitor.prototype.visitPrimaryExprCompare = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#primaryExprAllAny.
MySQLParserVisitor.prototype.visitPrimaryExprAllAny = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#primaryExprIsNull.
MySQLParserVisitor.prototype.visitPrimaryExprIsNull = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#compOp.
MySQLParserVisitor.prototype.visitCompOp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#predicate.
MySQLParserVisitor.prototype.visitPredicate = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#predicateExprIn.
MySQLParserVisitor.prototype.visitPredicateExprIn = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#predicateExprBetween.
MySQLParserVisitor.prototype.visitPredicateExprBetween = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#predicateExprLike.
MySQLParserVisitor.prototype.visitPredicateExprLike = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#predicateExprRegex.
MySQLParserVisitor.prototype.visitPredicateExprRegex = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#bitExpr.
MySQLParserVisitor.prototype.visitBitExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprConvert.
MySQLParserVisitor.prototype.visitSimpleExprConvert = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprVariable.
MySQLParserVisitor.prototype.visitSimpleExprVariable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprCast.
MySQLParserVisitor.prototype.visitSimpleExprCast = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprUnary.
MySQLParserVisitor.prototype.visitSimpleExprUnary = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprOdbc.
MySQLParserVisitor.prototype.visitSimpleExprOdbc = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprRuntimeFunction.
MySQLParserVisitor.prototype.visitSimpleExprRuntimeFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprFunction.
MySQLParserVisitor.prototype.visitSimpleExprFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprCollate.
MySQLParserVisitor.prototype.visitSimpleExprCollate = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprMatch.
MySQLParserVisitor.prototype.visitSimpleExprMatch = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprWindowingFunction.
MySQLParserVisitor.prototype.visitSimpleExprWindowingFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprBinary.
MySQLParserVisitor.prototype.visitSimpleExprBinary = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprColumnRef.
MySQLParserVisitor.prototype.visitSimpleExprColumnRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprParamMarker.
MySQLParserVisitor.prototype.visitSimpleExprParamMarker = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprSum.
MySQLParserVisitor.prototype.visitSimpleExprSum = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprConvertUsing.
MySQLParserVisitor.prototype.visitSimpleExprConvertUsing = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprSubQuery.
MySQLParserVisitor.prototype.visitSimpleExprSubQuery = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprGroupingOperation.
MySQLParserVisitor.prototype.visitSimpleExprGroupingOperation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprNot.
MySQLParserVisitor.prototype.visitSimpleExprNot = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprValues.
MySQLParserVisitor.prototype.visitSimpleExprValues = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprDefault.
MySQLParserVisitor.prototype.visitSimpleExprDefault = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprList.
MySQLParserVisitor.prototype.visitSimpleExprList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprInterval.
MySQLParserVisitor.prototype.visitSimpleExprInterval = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprCase.
MySQLParserVisitor.prototype.visitSimpleExprCase = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprConcat.
MySQLParserVisitor.prototype.visitSimpleExprConcat = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprLiteral.
MySQLParserVisitor.prototype.visitSimpleExprLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#arrayCast.
MySQLParserVisitor.prototype.visitArrayCast = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#jsonOperator.
MySQLParserVisitor.prototype.visitJsonOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#sumExpr.
MySQLParserVisitor.prototype.visitSumExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#groupingOperation.
MySQLParserVisitor.prototype.visitGroupingOperation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowFunctionCall.
MySQLParserVisitor.prototype.visitWindowFunctionCall = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowingClause.
MySQLParserVisitor.prototype.visitWindowingClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#leadLagInfo.
MySQLParserVisitor.prototype.visitLeadLagInfo = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#nullTreatment.
MySQLParserVisitor.prototype.visitNullTreatment = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#jsonFunction.
MySQLParserVisitor.prototype.visitJsonFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#inSumExpr.
MySQLParserVisitor.prototype.visitInSumExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#identListArg.
MySQLParserVisitor.prototype.visitIdentListArg = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#identList.
MySQLParserVisitor.prototype.visitIdentList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fulltextOptions.
MySQLParserVisitor.prototype.visitFulltextOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#runtimeFunctionCall.
MySQLParserVisitor.prototype.visitRuntimeFunctionCall = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#geometryFunction.
MySQLParserVisitor.prototype.visitGeometryFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#timeFunctionParameters.
MySQLParserVisitor.prototype.visitTimeFunctionParameters = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fractionalPrecision.
MySQLParserVisitor.prototype.visitFractionalPrecision = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#weightStringLevels.
MySQLParserVisitor.prototype.visitWeightStringLevels = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#weightStringLevelListItem.
MySQLParserVisitor.prototype.visitWeightStringLevelListItem = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dateTimeTtype.
MySQLParserVisitor.prototype.visitDateTimeTtype = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#trimFunction.
MySQLParserVisitor.prototype.visitTrimFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#substringFunction.
MySQLParserVisitor.prototype.visitSubstringFunction = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#functionCall.
MySQLParserVisitor.prototype.visitFunctionCall = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#udfExprList.
MySQLParserVisitor.prototype.visitUdfExprList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#udfExpr.
MySQLParserVisitor.prototype.visitUdfExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#variable.
MySQLParserVisitor.prototype.visitVariable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#userVariable.
MySQLParserVisitor.prototype.visitUserVariable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#systemVariable.
MySQLParserVisitor.prototype.visitSystemVariable = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#internalVariableName.
MySQLParserVisitor.prototype.visitInternalVariableName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#whenExpression.
MySQLParserVisitor.prototype.visitWhenExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#thenExpression.
MySQLParserVisitor.prototype.visitThenExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#elseExpression.
MySQLParserVisitor.prototype.visitElseExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#castType.
MySQLParserVisitor.prototype.visitCastType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#exprList.
MySQLParserVisitor.prototype.visitExprList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#charset.
MySQLParserVisitor.prototype.visitCharset = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#notRule.
MySQLParserVisitor.prototype.visitNotRule = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#not2Rule.
MySQLParserVisitor.prototype.visitNot2Rule = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#interval.
MySQLParserVisitor.prototype.visitInterval = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#intervalTimeStamp.
MySQLParserVisitor.prototype.visitIntervalTimeStamp = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#exprListWithParentheses.
MySQLParserVisitor.prototype.visitExprListWithParentheses = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#exprWithParentheses.
MySQLParserVisitor.prototype.visitExprWithParentheses = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleExprWithParentheses.
MySQLParserVisitor.prototype.visitSimpleExprWithParentheses = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#orderList.
MySQLParserVisitor.prototype.visitOrderList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#orderExpression.
MySQLParserVisitor.prototype.visitOrderExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#groupList.
MySQLParserVisitor.prototype.visitGroupList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#groupingExpression.
MySQLParserVisitor.prototype.visitGroupingExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#channel.
MySQLParserVisitor.prototype.visitChannel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#compoundStatement.
MySQLParserVisitor.prototype.visitCompoundStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#returnStatement.
MySQLParserVisitor.prototype.visitReturnStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#ifStatement.
MySQLParserVisitor.prototype.visitIfStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#ifBody.
MySQLParserVisitor.prototype.visitIfBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#thenStatement.
MySQLParserVisitor.prototype.visitThenStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#compoundStatementList.
MySQLParserVisitor.prototype.visitCompoundStatementList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#caseStatement.
MySQLParserVisitor.prototype.visitCaseStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#elseStatement.
MySQLParserVisitor.prototype.visitElseStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#labeledBlock.
MySQLParserVisitor.prototype.visitLabeledBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#unlabeledBlock.
MySQLParserVisitor.prototype.visitUnlabeledBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#label.
MySQLParserVisitor.prototype.visitLabel = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#beginEndBlock.
MySQLParserVisitor.prototype.visitBeginEndBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#labeledControl.
MySQLParserVisitor.prototype.visitLabeledControl = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#unlabeledControl.
MySQLParserVisitor.prototype.visitUnlabeledControl = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#loopBlock.
MySQLParserVisitor.prototype.visitLoopBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#whileDoBlock.
MySQLParserVisitor.prototype.visitWhileDoBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#repeatUntilBlock.
MySQLParserVisitor.prototype.visitRepeatUntilBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#spDeclarations.
MySQLParserVisitor.prototype.visitSpDeclarations = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#spDeclaration.
MySQLParserVisitor.prototype.visitSpDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#variableDeclaration.
MySQLParserVisitor.prototype.visitVariableDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#conditionDeclaration.
MySQLParserVisitor.prototype.visitConditionDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#spCondition.
MySQLParserVisitor.prototype.visitSpCondition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#sqlstate.
MySQLParserVisitor.prototype.visitSqlstate = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#handlerDeclaration.
MySQLParserVisitor.prototype.visitHandlerDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#handlerCondition.
MySQLParserVisitor.prototype.visitHandlerCondition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#cursorDeclaration.
MySQLParserVisitor.prototype.visitCursorDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#iterateStatement.
MySQLParserVisitor.prototype.visitIterateStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#leaveStatement.
MySQLParserVisitor.prototype.visitLeaveStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#getDiagnostics.
MySQLParserVisitor.prototype.visitGetDiagnostics = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#signalAllowedExpr.
MySQLParserVisitor.prototype.visitSignalAllowedExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#statementInformationItem.
MySQLParserVisitor.prototype.visitStatementInformationItem = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#conditionInformationItem.
MySQLParserVisitor.prototype.visitConditionInformationItem = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#signalInformationItemName.
MySQLParserVisitor.prototype.visitSignalInformationItemName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#signalStatement.
MySQLParserVisitor.prototype.visitSignalStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#resignalStatement.
MySQLParserVisitor.prototype.visitResignalStatement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#signalInformationItem.
MySQLParserVisitor.prototype.visitSignalInformationItem = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#cursorOpen.
MySQLParserVisitor.prototype.visitCursorOpen = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#cursorClose.
MySQLParserVisitor.prototype.visitCursorClose = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#cursorFetch.
MySQLParserVisitor.prototype.visitCursorFetch = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#schedule.
MySQLParserVisitor.prototype.visitSchedule = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#columnDefinition.
MySQLParserVisitor.prototype.visitColumnDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#checkOrReferences.
MySQLParserVisitor.prototype.visitCheckOrReferences = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#checkConstraint.
MySQLParserVisitor.prototype.visitCheckConstraint = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#constraintEnforcement.
MySQLParserVisitor.prototype.visitConstraintEnforcement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableConstraintDef.
MySQLParserVisitor.prototype.visitTableConstraintDef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#constraintName.
MySQLParserVisitor.prototype.visitConstraintName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fieldDefinition.
MySQLParserVisitor.prototype.visitFieldDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#columnAttribute.
MySQLParserVisitor.prototype.visitColumnAttribute = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#columnFormat.
MySQLParserVisitor.prototype.visitColumnFormat = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#storageMedia.
MySQLParserVisitor.prototype.visitStorageMedia = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#gcolAttribute.
MySQLParserVisitor.prototype.visitGcolAttribute = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#references.
MySQLParserVisitor.prototype.visitReferences = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#deleteOption.
MySQLParserVisitor.prototype.visitDeleteOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#keyList.
MySQLParserVisitor.prototype.visitKeyList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#keyPart.
MySQLParserVisitor.prototype.visitKeyPart = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#keyListWithExpression.
MySQLParserVisitor.prototype.visitKeyListWithExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#keyPartOrExpression.
MySQLParserVisitor.prototype.visitKeyPartOrExpression = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#keyListVariants.
MySQLParserVisitor.prototype.visitKeyListVariants = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexType.
MySQLParserVisitor.prototype.visitIndexType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexOption.
MySQLParserVisitor.prototype.visitIndexOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#commonIndexOption.
MySQLParserVisitor.prototype.visitCommonIndexOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#visibility.
MySQLParserVisitor.prototype.visitVisibility = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexTypeClause.
MySQLParserVisitor.prototype.visitIndexTypeClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fulltextIndexOption.
MySQLParserVisitor.prototype.visitFulltextIndexOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#spatialIndexOption.
MySQLParserVisitor.prototype.visitSpatialIndexOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dataTypeDefinition.
MySQLParserVisitor.prototype.visitDataTypeDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dataType.
MySQLParserVisitor.prototype.visitDataType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#nchar.
MySQLParserVisitor.prototype.visitNchar = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#realType.
MySQLParserVisitor.prototype.visitRealType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fieldLength.
MySQLParserVisitor.prototype.visitFieldLength = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fieldOptions.
MySQLParserVisitor.prototype.visitFieldOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#charsetWithOptBinary.
MySQLParserVisitor.prototype.visitCharsetWithOptBinary = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#ascii.
MySQLParserVisitor.prototype.visitAscii = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#unicode.
MySQLParserVisitor.prototype.visitUnicode = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#wsNumCodepoints.
MySQLParserVisitor.prototype.visitWsNumCodepoints = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#typeDatetimePrecision.
MySQLParserVisitor.prototype.visitTypeDatetimePrecision = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#charsetName.
MySQLParserVisitor.prototype.visitCharsetName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#collationName.
MySQLParserVisitor.prototype.visitCollationName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createTableOptions.
MySQLParserVisitor.prototype.visitCreateTableOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createTableOptionsSpaceSeparated.
MySQLParserVisitor.prototype.visitCreateTableOptionsSpaceSeparated = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createTableOption.
MySQLParserVisitor.prototype.visitCreateTableOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#ternaryOption.
MySQLParserVisitor.prototype.visitTernaryOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#defaultCollation.
MySQLParserVisitor.prototype.visitDefaultCollation = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#defaultEncryption.
MySQLParserVisitor.prototype.visitDefaultEncryption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#defaultCharset.
MySQLParserVisitor.prototype.visitDefaultCharset = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#partitionClause.
MySQLParserVisitor.prototype.visitPartitionClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#partitionDefKey.
MySQLParserVisitor.prototype.visitPartitionDefKey = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#partitionDefHash.
MySQLParserVisitor.prototype.visitPartitionDefHash = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#partitionDefRangeList.
MySQLParserVisitor.prototype.visitPartitionDefRangeList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#subPartitions.
MySQLParserVisitor.prototype.visitSubPartitions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#partitionKeyAlgorithm.
MySQLParserVisitor.prototype.visitPartitionKeyAlgorithm = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#partitionDefinitions.
MySQLParserVisitor.prototype.visitPartitionDefinitions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#partitionDefinition.
MySQLParserVisitor.prototype.visitPartitionDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#partitionValuesIn.
MySQLParserVisitor.prototype.visitPartitionValuesIn = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#partitionOption.
MySQLParserVisitor.prototype.visitPartitionOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#subpartitionDefinition.
MySQLParserVisitor.prototype.visitSubpartitionDefinition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#partitionValueItemListParen.
MySQLParserVisitor.prototype.visitPartitionValueItemListParen = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#partitionValueItem.
MySQLParserVisitor.prototype.visitPartitionValueItem = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#definerClause.
MySQLParserVisitor.prototype.visitDefinerClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#ifExists.
MySQLParserVisitor.prototype.visitIfExists = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#ifNotExists.
MySQLParserVisitor.prototype.visitIfNotExists = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#procedureParameter.
MySQLParserVisitor.prototype.visitProcedureParameter = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#functionParameter.
MySQLParserVisitor.prototype.visitFunctionParameter = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#collate.
MySQLParserVisitor.prototype.visitCollate = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#typeWithOptCollate.
MySQLParserVisitor.prototype.visitTypeWithOptCollate = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#schemaIdentifierPair.
MySQLParserVisitor.prototype.visitSchemaIdentifierPair = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#viewRefList.
MySQLParserVisitor.prototype.visitViewRefList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#updateList.
MySQLParserVisitor.prototype.visitUpdateList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#updateElement.
MySQLParserVisitor.prototype.visitUpdateElement = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#charsetClause.
MySQLParserVisitor.prototype.visitCharsetClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fieldsClause.
MySQLParserVisitor.prototype.visitFieldsClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fieldTerm.
MySQLParserVisitor.prototype.visitFieldTerm = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#linesClause.
MySQLParserVisitor.prototype.visitLinesClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#lineTerm.
MySQLParserVisitor.prototype.visitLineTerm = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#userList.
MySQLParserVisitor.prototype.visitUserList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createUserList.
MySQLParserVisitor.prototype.visitCreateUserList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterUserList.
MySQLParserVisitor.prototype.visitAlterUserList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#createUserEntry.
MySQLParserVisitor.prototype.visitCreateUserEntry = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#alterUserEntry.
MySQLParserVisitor.prototype.visitAlterUserEntry = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#retainCurrentPassword.
MySQLParserVisitor.prototype.visitRetainCurrentPassword = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#discardOldPassword.
MySQLParserVisitor.prototype.visitDiscardOldPassword = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#replacePassword.
MySQLParserVisitor.prototype.visitReplacePassword = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#userIdentifierOrText.
MySQLParserVisitor.prototype.visitUserIdentifierOrText = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#user.
MySQLParserVisitor.prototype.visitUser = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#likeClause.
MySQLParserVisitor.prototype.visitLikeClause = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#likeOrWhere.
MySQLParserVisitor.prototype.visitLikeOrWhere = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#onlineOption.
MySQLParserVisitor.prototype.visitOnlineOption = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#noWriteToBinLog.
MySQLParserVisitor.prototype.visitNoWriteToBinLog = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#usePartition.
MySQLParserVisitor.prototype.visitUsePartition = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#fieldIdentifier.
MySQLParserVisitor.prototype.visitFieldIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#columnName.
MySQLParserVisitor.prototype.visitColumnName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#columnInternalRef.
MySQLParserVisitor.prototype.visitColumnInternalRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#columnInternalRefList.
MySQLParserVisitor.prototype.visitColumnInternalRefList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#columnRef.
MySQLParserVisitor.prototype.visitColumnRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#insertIdentifier.
MySQLParserVisitor.prototype.visitInsertIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexName.
MySQLParserVisitor.prototype.visitIndexName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#indexRef.
MySQLParserVisitor.prototype.visitIndexRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableWild.
MySQLParserVisitor.prototype.visitTableWild = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#schemaName.
MySQLParserVisitor.prototype.visitSchemaName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#schemaRef.
MySQLParserVisitor.prototype.visitSchemaRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#procedureName.
MySQLParserVisitor.prototype.visitProcedureName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#procedureRef.
MySQLParserVisitor.prototype.visitProcedureRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#functionName.
MySQLParserVisitor.prototype.visitFunctionName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#functionRef.
MySQLParserVisitor.prototype.visitFunctionRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#triggerName.
MySQLParserVisitor.prototype.visitTriggerName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#triggerRef.
MySQLParserVisitor.prototype.visitTriggerRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#viewName.
MySQLParserVisitor.prototype.visitViewName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#viewRef.
MySQLParserVisitor.prototype.visitViewRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tablespaceName.
MySQLParserVisitor.prototype.visitTablespaceName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tablespaceRef.
MySQLParserVisitor.prototype.visitTablespaceRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#logfileGroupName.
MySQLParserVisitor.prototype.visitLogfileGroupName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#logfileGroupRef.
MySQLParserVisitor.prototype.visitLogfileGroupRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#eventName.
MySQLParserVisitor.prototype.visitEventName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#eventRef.
MySQLParserVisitor.prototype.visitEventRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#udfName.
MySQLParserVisitor.prototype.visitUdfName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#serverName.
MySQLParserVisitor.prototype.visitServerName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#serverRef.
MySQLParserVisitor.prototype.visitServerRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#engineRef.
MySQLParserVisitor.prototype.visitEngineRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableName.
MySQLParserVisitor.prototype.visitTableName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#filterTableRef.
MySQLParserVisitor.prototype.visitFilterTableRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableRefWithWildcard.
MySQLParserVisitor.prototype.visitTableRefWithWildcard = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableRef.
MySQLParserVisitor.prototype.visitTableRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableRefList.
MySQLParserVisitor.prototype.visitTableRefList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#tableAliasRefList.
MySQLParserVisitor.prototype.visitTableAliasRefList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#parameterName.
MySQLParserVisitor.prototype.visitParameterName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#labelIdentifier.
MySQLParserVisitor.prototype.visitLabelIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#labelRef.
MySQLParserVisitor.prototype.visitLabelRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#roleIdentifier.
MySQLParserVisitor.prototype.visitRoleIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#roleRef.
MySQLParserVisitor.prototype.visitRoleRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#pluginRef.
MySQLParserVisitor.prototype.visitPluginRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#componentRef.
MySQLParserVisitor.prototype.visitComponentRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#resourceGroupRef.
MySQLParserVisitor.prototype.visitResourceGroupRef = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#windowName.
MySQLParserVisitor.prototype.visitWindowName = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#pureIdentifier.
MySQLParserVisitor.prototype.visitPureIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#identifier.
MySQLParserVisitor.prototype.visitIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#identifierList.
MySQLParserVisitor.prototype.visitIdentifierList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#identifierListWithParentheses.
MySQLParserVisitor.prototype.visitIdentifierListWithParentheses = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#qualifiedIdentifier.
MySQLParserVisitor.prototype.visitQualifiedIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#simpleIdentifier.
MySQLParserVisitor.prototype.visitSimpleIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#dotIdentifier.
MySQLParserVisitor.prototype.visitDotIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#ulong_number.
MySQLParserVisitor.prototype.visitUlong_number = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#real_ulong_number.
MySQLParserVisitor.prototype.visitReal_ulong_number = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#ulonglong_number.
MySQLParserVisitor.prototype.visitUlonglong_number = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#real_ulonglong_number.
MySQLParserVisitor.prototype.visitReal_ulonglong_number = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#literal.
MySQLParserVisitor.prototype.visitLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#signedLiteral.
MySQLParserVisitor.prototype.visitSignedLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#stringList.
MySQLParserVisitor.prototype.visitStringList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#textStringLiteral.
MySQLParserVisitor.prototype.visitTextStringLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#textString.
MySQLParserVisitor.prototype.visitTextString = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#textStringHash.
MySQLParserVisitor.prototype.visitTextStringHash = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#textLiteral.
MySQLParserVisitor.prototype.visitTextLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#textStringNoLinebreak.
MySQLParserVisitor.prototype.visitTextStringNoLinebreak = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#textStringLiteralList.
MySQLParserVisitor.prototype.visitTextStringLiteralList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#numLiteral.
MySQLParserVisitor.prototype.visitNumLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#boolLiteral.
MySQLParserVisitor.prototype.visitBoolLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#nullLiteral.
MySQLParserVisitor.prototype.visitNullLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#temporalLiteral.
MySQLParserVisitor.prototype.visitTemporalLiteral = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#floatOptions.
MySQLParserVisitor.prototype.visitFloatOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#standardFloatOptions.
MySQLParserVisitor.prototype.visitStandardFloatOptions = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#precision.
MySQLParserVisitor.prototype.visitPrecision = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#textOrIdentifier.
MySQLParserVisitor.prototype.visitTextOrIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#lValueIdentifier.
MySQLParserVisitor.prototype.visitLValueIdentifier = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#roleIdentifierOrText.
MySQLParserVisitor.prototype.visitRoleIdentifierOrText = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#sizeNumber.
MySQLParserVisitor.prototype.visitSizeNumber = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#parentheses.
MySQLParserVisitor.prototype.visitParentheses = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#equal.
MySQLParserVisitor.prototype.visitEqual = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#optionType.
MySQLParserVisitor.prototype.visitOptionType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#varIdentType.
MySQLParserVisitor.prototype.visitVarIdentType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#setVarIdentType.
MySQLParserVisitor.prototype.visitSetVarIdentType = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#identifierKeyword.
MySQLParserVisitor.prototype.visitIdentifierKeyword = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#identifierKeywordsAmbiguous1RolesAndLabels.
MySQLParserVisitor.prototype.visitIdentifierKeywordsAmbiguous1RolesAndLabels = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#identifierKeywordsAmbiguous2Labels.
MySQLParserVisitor.prototype.visitIdentifierKeywordsAmbiguous2Labels = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#labelKeyword.
MySQLParserVisitor.prototype.visitLabelKeyword = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#identifierKeywordsAmbiguous3Roles.
MySQLParserVisitor.prototype.visitIdentifierKeywordsAmbiguous3Roles = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#identifierKeywordsUnambiguous.
MySQLParserVisitor.prototype.visitIdentifierKeywordsUnambiguous = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#roleKeyword.
MySQLParserVisitor.prototype.visitRoleKeyword = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#lValueKeyword.
MySQLParserVisitor.prototype.visitLValueKeyword = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#identifierKeywordsAmbiguous4SystemVariables.
MySQLParserVisitor.prototype.visitIdentifierKeywordsAmbiguous4SystemVariables = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#roleOrIdentifierKeyword.
MySQLParserVisitor.prototype.visitRoleOrIdentifierKeyword = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by MySQLParser#roleOrLabelKeyword.
MySQLParserVisitor.prototype.visitRoleOrLabelKeyword = function(ctx) {
  return this.visitChildren(ctx);
};



exports.MySQLParserVisitor = MySQLParserVisitor;