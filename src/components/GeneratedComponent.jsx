import React, { useState, useEffect } from 'react';
import { ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, ArrowDownCircle, Edit2, Save, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const COLORS = [
    'bg-blue-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-red-100',
    'bg-purple-100',
    'bg-pink-100',
    'bg-indigo-100',
    'bg-orange-100'
];

const DEFAULT_WIDGET_CONTENT = {
  xs: '# Small note\nJust a brief point.',
  sm: '# Brief Message\nThis is a quick update with a simple point.',
  md: `# Medium Update
This is a medium-length update that includes some structured content.

## Key Points
* First important point
* Second key detail
* Final consideration

| Column 1 | Column 2 |
|----------|-----------|
| Data 1   | Value 1   |
| Data 2   | Value 2   |`,
  lg: `# Detailed Report
## Introduction
This is a comprehensive report that contains multiple sections and detailed information.

### Key Findings
1. First major finding with supporting details
2. Second significant observation
3. Additional important notes

## Data Analysis
| Metric | Value | Change |
|--------|--------|--------|
| Users  | 1,234  | +15%   |
| Time   | 45min  | -5%    |
| Score  | 4.8    | +0.3   |

### Conclusions
Final thoughts and recommendations based on the analysis above.`,
  xl: `# Comprehensive Analysis Report
## Executive Summary
This extensive report provides a detailed analysis of our findings with multiple sections, tables, and structured content.

## Background
Detailed context and background information for this analysis...

## Methodology
### Data Collection
* Primary research methods
* Secondary data sources
* Validation procedures

### Analysis Framework
1. Initial data processing
2. Statistical analysis
3. Validation steps

## Detailed Findings
### Primary Results
| Category | Result | Confidence |
|----------|--------|------------|
| Type A   | 85%    | High       |
| Type B   | 72%    | Medium     |
| Type C   | 93%    | Very High  |

### Secondary Observations
* Key observation 1 with extended explanation
* Key observation 2 with supporting data
* Key observation 3 with implications

## Recommendations
1. First major recommendation with implementation details
2. Second key suggestion with timeline
3. Final recommendation with resource requirements

## Conclusion
Summary of all findings and next steps...`
};

const Widget = ({ id, title = 'Widget Title', colSpan, textSize, color, content, onChangeSize, onAddWidget, onChangeSpan, onUpdateWidget }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableContent, setEditableContent] = useState(content || DEFAULT_WIDGET_CONTENT[textSize]);

  useEffect(() => {
    setEditableContent(content || DEFAULT_WIDGET_CONTENT[textSize]);
  }, [textSize, content]);

  const handleSave = () => {
    onUpdateWidget(id, {
      title: editableTitle,
      content: editableContent
    });
    setIsEditing(false);
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${color} relative`} 
         style={{ gridColumn: `span ${colSpan}` }}>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          {isEditing ? (
            <input
              type="text"
              value={editableTitle}
              onChange={(e) => setEditableTitle(e.target.value)}
              className="text-lg font-semibold mb-2 border rounded px-2 py-1 w-full"
            />
          ) : (
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
          )}
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="ml-2 p-1 hover:bg-gray-200 rounded"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          </button>
          {isEditing && (
            <button
              onClick={() => setIsEditing(false)}
              className="ml-2 p-1 hover:bg-gray-200 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex justify-between items-center">
          <select 
            value={textSize}
            onChange={(e) => onChangeSize(id, e.target.value)}
            className="text-sm border rounded p-1"
          >
            <option value="xs">Extra Small</option>
            <option value="sm">Small</option>
            <option value="md">Medium</option>
            <option value="lg">Large</option>
            <option value="xl">Extra Large</option>
          </select>
          <select
            value={colSpan}
            onChange={(e) => onChangeSpan(id, parseInt(e.target.value))}
            className="text-sm border rounded p-1 ml-2"
          >
            <option value="1">1 Column</option>
            <option value="2">2 Columns</option>
            <option value="3">3 Columns</option>
          </select>
        </div>
        
        <div className="flex justify-between gap-2">
          <button 
            onClick={() => onAddWidget(id, 'left')}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            title="Add widget to left"
          >
            <ArrowLeftCircle className="w-4 h-4" />
            Add Left
          </button>
          <button 
            onClick={() => onAddWidget(id, 'right')}
            className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm"
            title="Add widget to right"
          >
            Add Right
            <ArrowRightCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        {isEditing ? (
          <textarea
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            className="w-full h-64 p-2 border rounded font-mono text-sm"
            placeholder="Enter Markdown content..."
          />
        ) : (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
            >
              {editableContent}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

const Row = ({ rowId, widgets, onChangeSize, onAddWidget, onChangeSpan, onAddRow, onUpdateWidget }) => (
  <div className="relative mb-4">
    <div className="absolute -left-16 top-1/2 -translate-y-1/2 flex flex-col gap-2">
      <button 
        onClick={() => onAddRow(rowId, 'above')}
        className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs whitespace-nowrap"
        title="Add row above"
      >
        <ArrowUpCircle className="w-4 h-4" />
        New Row
      </button>
      <button 
        onClick={() => onAddRow(rowId, 'below')}
        className="flex flex-col items-center gap-1 p-2 hover:bg-gray-100 rounded text-xs whitespace-nowrap"
        title="New Row"
      >
        <ArrowDownCircle className="w-4 h-4" />
        New Row
      </button>
    </div>
    <div className="grid grid-cols-3 gap-4">
      {widgets.map((widget) => (
        <Widget
          key={widget.id}
          {...widget}
          onChangeSize={onChangeSize}
          onAddWidget={onAddWidget}
          onChangeSpan={onChangeSpan}
          onUpdateWidget={onUpdateWidget}
        />
      ))}
    </div>
  </div>
);

const HubPage = () => {
  const [rows, setRows] = useState([
    {
      id: 'row1',
      widgets: [
        { id: 'w1', title: 'Quick Update', colSpan: 1, textSize: 'sm', color: COLORS[0] },
        { id: 'w2', title: 'Detailed Report', colSpan: 2, textSize: 'md', color: COLORS[1] }
      ]
    },
    {
      id: 'row2',
      widgets: [
        { id: 'w3', title: 'Analysis', colSpan: 2, textSize: 'lg', color: COLORS[2] },
        { id: 'w4', title: 'Note', colSpan: 1, textSize: 'xs', color: COLORS[3] }
      ]
    }
  ]);

  const handleSizeChange = (widgetId, newSize) => {
    setRows(rows.map(row => ({
      ...row,
      widgets: row.widgets.map(widget => 
        widget.id === widgetId ? { 
          ...widget, 
          textSize: newSize,
          content: DEFAULT_WIDGET_CONTENT[newSize]
        } : widget
      )
    })));
  };

  const handleSpanChange = (widgetId, newSpan) => {
    setRows(rows.map(row => ({
      ...row,
      widgets: row.widgets.map(widget => 
        widget.id === widgetId ? { ...widget, colSpan: newSpan } : widget
      )
    })));
  };

  const handleUpdateWidget = (widgetId, updates) => {
    setRows(rows.map(row => ({
      ...row,
      widgets: row.widgets.map(widget => 
        widget.id === widgetId ? { ...widget, ...updates } : widget
      )
    })));
  };

  const handleAddWidget = (widgetId, position) => {
    setRows(rows.map(row => {
      const widgetIndex = row.widgets.findIndex(w => w.id === widgetId);
      if (widgetIndex === -1) return row;

      const newWidget = {
        id: `w${Date.now()}`,
        title: 'New Widget',
        colSpan: 1,
        textSize: 'sm',
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      };

      const newWidgets = [...row.widgets];
      newWidgets.splice(
        position === 'left' ? widgetIndex : widgetIndex + 1,
        0,
        newWidget
      );

      return {
        ...row,
        widgets: newWidgets
      };
    }));
  };

  const handleAddRow = (rowId, position) => {
    const rowIndex = rows.findIndex(row => row.id === rowId);
    const newRow = {
      id: `row${Date.now()}`,
      widgets: [
        {
          id: `w${Date.now()}`,
          title: 'New Widget',
          colSpan: 1,
          textSize: 'sm',
          color: COLORS[Math.floor(Math.random() * COLORS.length)]
        }
      ]
    };
    
    const newRows = [...rows];
    newRows.splice(
      position === 'above' ? rowIndex : rowIndex + 1,
      0,
      newRow
    );
    setRows(newRows);
  };

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto pl-16">
        {rows.map((row) => (
          <Row
            key={row.id}
            rowId={row.id}
            widgets={row.widgets}
            onChangeSize={handleSizeChange}
            onAddWidget={handleAddWidget}
            onChangeSpan={handleSpanChange}
            onAddRow={handleAddRow}
            onUpdateWidget={handleUpdateWidget}
          />
        ))}
      </div>
    </div>
  );
};

export default HubPage;