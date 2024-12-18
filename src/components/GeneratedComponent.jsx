import React, { useState, useEffect } from 'react';
import { ArrowLeftCircle, ArrowRightCircle, ArrowUpCircle, ArrowDownCircle, Edit2, Save, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './GeneratedComponent.css'; // Import the CSS file

const COLORS = [
    'bg-blue',
    'bg-green',
    'bg-yellow',
    'bg-red',
    'bg-purple',
    'bg-pink',
    'bg-indigo',
    'bg-orange'
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
    <div className={`widget ${color}`} style={{ gridColumn: `span ${colSpan}` }}>
      <div className="widget-header">
        {isEditing ? (
          <input
            type="text"
            value={editableTitle}
            onChange={(e) => setEditableTitle(e.target.value)}
            className="widget-title-input"
          />
        ) : (
          <h2 className="widget-title">{title}</h2>
        )}
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="widget-edit-button"
        >
          {isEditing ? <Save className="icon" /> : <Edit2 className="icon" />}
        </button>
        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            className="widget-cancel-button"
          >
            <X className="icon" />
          </button>
        )}
      </div>

      <div className="widget-controls">
        <select 
          value={textSize}
          onChange={(e) => onChangeSize(id, e.target.value)}
          className="widget-select"
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
          className="widget-select"
        >
          <option value="1">1 Column</option>
          <option value="2">2 Columns</option>
          <option value="3">3 Columns</option>
        </select>
      </div>
      
      <div className="widget-buttons">
        <button 
          onClick={() => onAddWidget(id, 'left')}
          className="widget-button"
          title="Add widget to left"
        >
          <ArrowLeftCircle className="icon" />
          Add Left
        </button>
        <button 
          onClick={() => onAddWidget(id, 'right')}
          className="widget-button"
          title="Add widget to right"
        >
          Add Right
          <ArrowRightCircle className="icon" />
        </button>
      </div>
      
      <div className="widget-content">
        {isEditing ? (
          <textarea
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            className="widget-textarea"
            placeholder="Enter Markdown content..."
          />
        ) : (
          <div className="markdown-content">
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
  <div className="row">
    <div className="row-controls">
      <button 
        onClick={() => onAddRow(rowId, 'above')}
        className="row-button"
        title="Add row above"
      >
        <ArrowUpCircle className="icon" />
        New Row
      </button>
      <button 
        onClick={() => onAddRow(rowId, 'below')}
        className="row-button"
        title="New Row"
      >
        <ArrowDownCircle className="icon" />
        New Row
      </button>
    </div>
    <div className="row-widgets">
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
    <div className="hub-page">
      <div className="hub-content">
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