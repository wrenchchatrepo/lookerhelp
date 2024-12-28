# Introduction to LookML

## What is LookML?

LookML is a powerful, declarative language for modeling data in Looker. It provides a structured way to define dimensions, measures, and relationships between data elements, enabling analysts and developers to create reusable, maintainable data models.

## Core Components and Examples

### 1. Views

Views represent your data tables or derived tables. They're the foundation of your LookML model.

#### Basic View Example:
```lookml
view: orders {
  sql_table_name: sales.orders ;;
  
  dimension: order_id {
    primary_key: yes
    type: number
    sql: ${TABLE}.order_id ;;
  }
  
  dimension: status {
    type: string
    sql: ${TABLE}.status ;;
  }
}
```

#### Derived Table Example:
```lookml
view: high_value_orders {
  derived_table: {
    sql: SELECT *
         FROM sales.orders
         WHERE total_amount > 1000 ;;
  }
  
  dimension: order_id {
    primary_key: yes
    type: number
    sql: ${TABLE}.order_id ;;
  }
}
```

### 2. Dimensions

Dimensions are attributes that describe your data.

#### Examples of Different Dimension Types:
```lookml
view: orders {
  # String Dimension
  dimension: customer_name {
    type: string
    sql: ${TABLE}.customer_name ;;
  }
  
  # Number Dimension
  dimension: order_amount {
    type: number
    sql: ${TABLE}.amount ;;
    value_format_name: usd
  }
  
  # Date Dimension
  dimension_group: ordered {
    type: time
    timeframes: [date, week, month, year]
    sql: ${TABLE}.order_date ;;
  }
  
  # Boolean Dimension
  dimension: is_completed {
    type: yesno
    sql: ${TABLE}.status = 'completed' ;;
  }
  
  # Geographic Dimension
  dimension: location {
    type: location
    sql_latitude: ${TABLE}.latitude ;;
    sql_longitude: ${TABLE}.longitude ;;
  }
}
```

### 3. Measures

Measures are aggregations of your dimensions.

#### Examples of Different Measure Types:
```lookml
view: orders {
  # Sum Measure
  measure: total_revenue {
    type: sum
    sql: ${TABLE}.amount ;;
    value_format_name: usd
  }
  
  # Average Measure
  measure: average_order_value {
    type: average
    sql: ${TABLE}.amount ;;
    value_format_name: usd
  }
  
  # Count Measure
  measure: number_of_orders {
    type: count
    drill_fields: [order_id, customer_name, amount]
  }
  
  # Count Distinct Measure
  measure: unique_customers {
    type: count_distinct
    sql: ${TABLE}.customer_id ;;
  }
  
  # Custom Measure
  measure: gross_margin_percentage {
    type: number
    sql: ${total_revenue} / NULLIF(${total_cost}, 0) * 100 ;;
    value_format: "0.00\%"
  }
}
```

### 4. Explores

Explores define how users can analyze data by combining views.

#### Example Explore:
```lookml
explore: orders {
  label: "Sales Analysis"
  description: "Use this explore to analyze sales data"
  
  join: customers {
    type: left_outer
    sql_on: ${orders.customer_id} = ${customers.id} ;;
    relationship: many_to_one
  }
  
  join: products {
    type: left_outer
    sql_on: ${orders.product_id} = ${products.id} ;;
    relationship: many_to_one
  }
}
```

### 5. Filters

Filters help narrow down data analysis.

#### Examples of Different Filter Types:
```lookml
view: orders {
  # Field Filter
  dimension: order_date {
    type: date
    sql: ${TABLE}.order_date ;;
  }
  
  # Always Filter
  always_filter: {
    filters: [order_date: "last 90 days"]
  }
  
  # Templated Filter
  dimension: status {
    type: string
    sql: {% condition status_filter %}${TABLE}.status{% endcondition %} ;;
  }
  
  filter: status_filter {
    type: string
    suggest_dimension: status
  }
}
```

### 6. Parameters

Parameters add flexibility to your models.

#### Examples of Different Parameter Types:
```lookml
view: orders {
  # String Parameter
  parameter: metric_selector {
    type: string
    allowed_value: { value: "total_revenue" }
    allowed_value: { value: "order_count" }
  }
  
  # Number Parameter
  parameter: sale_price_threshold {
    type: number
    default_value: "100"
  }
  
  # Date Parameter
  parameter: date_granularity {
    type: string
    allowed_value: { value: "day" }
    allowed_value: { value: "week" }
    allowed_value: { value: "month" }
  }
}
```

## Best Practices

1. **Naming Conventions**
   - Use clear, descriptive names
   - Follow a consistent naming pattern
   - Use lowercase with underscores

2. **Documentation**
   - Add descriptions to explores, views, dimensions, and measures
   - Document complex calculations
   - Include business context

3. **Performance**
   - Use appropriate indexes
   - Optimize derived tables
   - Use datagroups for caching

4. **Security**
   - Implement row-level security
   - Use access grants appropriately
   - Follow principle of least privilege

## Common Design Patterns

### 1. Extended Views
```lookml
view: orders {
  extends: [order_base]
  
  measure: total_revenue {
    type: sum
    sql: ${amount} ;;
  }
}
```

### 2. Refinements
```lookml
view: +orders {
  dimension: amount {
    value_format_name: usd
  }
}
```

### 3. Templated Filters
```lookml
dimension: dynamic_sales {
  type: number
  sql: 
    CASE
      WHEN {% parameter metric_selector %} = 'revenue' THEN ${revenue}
      WHEN {% parameter metric_selector %} = 'profit' THEN ${profit}
      ELSE NULL
    END ;;
}
```

## Getting Started

1. Understand your data structure
2. Plan your data model
3. Create basic views
4. Add dimensions and measures
5. Create explores
6. Test and validate
7. Document your work
8. Deploy and maintain

## Resources

- [Looker Documentation](https://docs.looker.com/)
- [LookML Reference](https://docs.looker.com/reference/lookml-reference)
- [Looker Community Portal](https://community.looker.com/)
