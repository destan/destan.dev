# Java Package Naming Conventions: The Definitive Reference

The most critical principle is that **all package names must be lowercase** to avoid conflicts with class names.

For multi-word packages, the **general convention is to concatenate words without separators** (e.g., `com.company.deepspace`), though **Oracle permits underscores when converting hyphenated domain names** (e.g., `hyphenated-name.example.org` becomes `org.example.hyphenated_name`).

This exception creates tension with stricter style guides like Google's, which prohibit underscores entirely.

This reference synthesizes official Java Language Specification requirements, major industry standards from Google and Apache, and established community practices to provide Java developers with guidance on package naming conventions.

## Official Java language requirements

### Mandatory rules from Java Language Specification

The Java Language Specification (JLS) establishes **compiler-enforced requirements** that cannot be violated:

**Character restrictions**: Package name components must be valid Java identifiers consisting of Java letters (Unicode characters, A-Z, a-z, underscore, dollar sign) followed by Java letters or digits. **Hyphens, spaces, and most punctuation are forbidden**.

**All lowercase convention**: The JLS states definitively that **"package names are written in all lower case to avoid conflict with the names of classes or interfaces."** This rule appears consistently across JLS versions from SE6 through SE20.

**Fully qualified naming**: Package declarations must use fully qualified names with components separated by dots. Reserved Java keywords cannot be used as package components without prefixing with an underscore.

**No length limits**: The JLS imposes no explicit length restrictions, though practical limits exist from the JVM class file format (65,535 UTF-8 bytes for fully qualified names) and file system constraints.

### Recommended conventions from Oracle documentation

Oracle's official documentation distinguishes between language requirements and **naming recommendations**:

**Domain name reversal**: Oracle recommends forming unique package names by reversing Internet domain names: "You form a unique package name by first having an Internet domain name, such as oracle.com. You then reverse this name, component by component, to obtain com.oracle."

**Special character handling**: When domain names contain invalid characters, Oracle specifies conversion rules:

| Domain Name | Package Name Prefix | Reason |
|-------------|-------------------|---------|
| `hyphenated-name.example.org` | `org.example.hyphenated_name` | Convert hyphens to underscores |
| `example.int` | `int_.example` | Prefix reserved keyword |
| `123name.example.com` | `com.example._123name` | Prefix digit-starting component |

The Oracle tutorial emphasizes these are **recommendations for widely distributed packages**, not mandatory language requirements, though they've become de facto standards in professional development.

**Important note on underscores**: Oracle's allowance for underscores in domain conversion creates a notable exception to the general "no separators" rule. This represents a point of divergence in the Java community, with Oracle permitting underscores for domain conversion while stricter style guides (notably Google's) prohibit them entirely.

## Industry standard implementations

### Google Java Style Guide specifications

Google provides the **most restrictive and explicit** package naming guidelines in their official style guide:

**Multi-word packages**: "Package names use only lowercase letters and digits (no underscores). Consecutive words are simply concatenated together. For example, `com.example.deepspace`, not `com.example.deepSpace` or `com.example.deep_space`."

**Complete prohibition of underscores**: Unlike Oracle's accommodation for domain conversion, Google **completely prohibits underscores** in package names, representing the strictest interpretation of Java conventions. This means Google would recommend finding alternative solutions for hyphenated domains rather than using underscores.

**ASCII-only preference**: Google restricts packages to ASCII letters and digits, avoiding Unicode complications despite JLS support for international characters.

### Apache Software Foundation conventions

Apache projects consistently follow Oracle conventions with organizational consistency:

**Standard domain reversal**: All Apache projects use `org.apache.[projectname]` hierarchy, demonstrating systematic application of domain reversal rules.

**Multi-word concatenation**: Apache projects like `org.apache.commons.collections4` and `org.apache.kafka.clients.consumer` exemplify lowercase concatenation without separators.

**Internal consistency**: Individual Apache projects may add internal naming conventions beyond the Java standard while maintaining the base framework.

### Spring Framework architectural guidance

Spring extends basic naming conventions with **architectural recommendations**:

**Component scanning optimization**: Spring Boot documentation recommends placing the main application class in a root package above other classes, as `@SpringBootApplication` creates a search base: "We generally recommend that you locate your main application class in a root package above other classes."

**Functional organization**: Spring promotes package-by-feature over package-by-layer:

```java
com.example.myapplication
├── customer/
│   ├── CustomerController.java
│   └── CustomerService.java
└── order/
├── OrderController.java
└── OrderService.java
```

**Default package prohibition**: Spring explicitly discourages default packages: "The use of the 'default package' is generally discouraged and should be avoided."

### Eclipse Foundation technical restrictions

Eclipse provides the **most technically restrictive** guidelines:

**Character limitations**: "Package names should contain only lowercase ASCII alphanumerics, and avoid underscore _ or dollar sign $ characters" — stricter than Oracle specifications.

**Namespace hierarchy**: Eclipse enforces consistent organizational structure with `org.eclipse.[component]` and reserved namespaces for internal packages (`org.eclipse.[component].internal`).

## Community practices and real-world usage

### De facto standard from major projects

Analysis of popular open-source Java projects reveals **overwhelming consistency** in package naming:

**Jackson (FasterXML)**: `com.fasterxml.jackson.databind`, `com.fasterxml.jackson.dataformat` — demonstrates concatenated multi-word components without separators.

**Apache Commons**: `org.apache.commons.lang3`, `org.apache.commons.collections4` — shows numerical suffixes integrated naturally into lowercase naming.

**Hibernate**: `org.hibernate.criterion`, `org.hibernate.userguide.naming` — illustrates functional organization within established naming patterns.

### Community consensus on multi-word handling

**Stack Overflow high-voted answers** and **GitHub project analysis** show near-universal adoption of lowercase concatenation:

```java
// Community standard
com.company.productcatalog
com.example.usermanagement
org.framework.dataaccess

// Avoided by community
com.company.product_catalog    // Underscores discouraged
com.example.userManagement     // CamelCase rejected
org.framework.data-access      // Hyphens invalid
```

**Community rationale** from developer discussions emphasizes practical benefits: file system compatibility across platforms, clear distinction from class names, and tool compatibility across IDEs and build systems.

### GitHub and enterprise patterns

**Personal projects** commonly use GitHub-based conventions: `io.github.username.projectname` for developers without registered domains.

**Enterprise applications** consistently implement functional hierarchies:

```java
// E-commerce system
com.company.ecommerce.catalog
com.company.ecommerce.payment
com.company.ecommerce.customer.profile

// Financial services
com.bank.core.account
com.bank.security.authentication
com.bank.reporting.analytics
```

## Technical implementation details

### Character support and restrictions

**Unicode support**: Java supports the full Unicode character set in package names, enabling international development:

```java
package com.社名.製品;           // Japanese
package com.société.produit;   // French with accents
package com.компания.модуль;   // Cyrillic
```

**Practical constraints**: While Unicode is technically supported, **community practice favors ASCII** for maximum compatibility across development environments and file systems.

**Invalid characters**: The JLS prohibits hyphens, spaces, and most punctuation. Numbers cannot start package components but may appear after the first character.

### Length and structure recommendations

**Optimal sizing**: Community best practices suggest **4-15 characters per package component** and **3-5 hierarchy levels maximum** for maintainability.

**File system compatibility**: Windows' 260-character path limit and Unix 255-character component limits provide practical upper bounds, though rarely reached in normal development.

**Cross-platform considerations**: Lowercase-only naming avoids case-sensitivity conflicts between Windows (case-insensitive) and Unix systems (case-sensitive).

### Reserved word handling

When package components conflict with Java's **53 reserved words** (50 keywords plus true, false, null), prefix with underscore:

```java
// Domain contains reserved word
package com.example._class.utils;     // 'class' is reserved
package org.company._interface.api;   // 'interface' is reserved
package com.domain._int.services;     // 'int' is reserved
```

## Authority-based recommendations

### Must do (JLS mandatory)
- **Use lowercase only** for all package components
- **Use valid Java identifiers** (letters, digits, underscores, dollar signs)
- **Separate components with dots** only
- **Avoid Java reserved words** without underscore prefixes
- **Use UTF-8 compatible characters** within JVM limits

### Should do (industry standard)
- **Implement domain name reversal** for organizational packages
- **Concatenate multi-word components** without separators (e.g., `deepspace`)
- **Organize by business function** rather than technical layers
- **Maintain shallow hierarchies** (3-5 levels maximum)
- **Use ASCII characters** for maximum compatibility

### May do (community practice)
- **Use underscores sparingly** for domain conversion only
- **Implement GitHub conventions** for personal projects (`io.github.username`)
- **Add organizational prefixes** for internal disambiguation
- **Use numerical suffixes** for versioning when appropriate

## Practical examples and anti-patterns

### Recommended implementations

```java
// Enterprise application
package com.acmecorp.inventory.catalog;
package com.acmecorp.inventory.warehouse;
package com.acmecorp.customer.authentication;

// Open source project
package org.apache.commons.collections4;
package org.springframework.boot.autoconfigure;
package com.fasterxml.jackson.databind;

// Personal/educational project
package edu.university.cs.algorithms;
package io.github.johndoe.utilities;
package dev.developer.experimentalapi;
```

### Common anti-patterns to avoid

```java
// Excessive nesting
package com.company.division.department.team.project.module.component;

// Mixed case violations
package com.Company.MyProject.DataAccess;

// Invalid separators
package com.example.my-project;        // Hyphens forbidden
package com.example.my_package;        // Underscores discouraged

// Unclear abbreviations
package com.co.div.dept.prj.mod;       // Cryptic components
```

## Conclusion

Java package naming conventions operate on **three authority levels**: JLS mandatory rules ensure compiler compatibility, industry standards provide practical frameworks, and community practices demonstrate real-world implementation. **The core principle remains consistent across all levels: lowercase concatenation of meaningful components organized hierarchically**.

Modern Java development should follow **Google's strict interpretation** as the safest approach: lowercase letters and digits only, with words concatenated without separators. This approach satisfies all official requirements while maximizing compatibility across tools, platforms, and teams. **When domain names contain hyphens, developers face a choice**: follow Oracle's underscore conversion rule or adopt Google's stricter approach of restructuring package names entirely. The trend in modern development favors **avoiding underscores altogether**, maintaining the clean aesthetic that has made Java package naming remarkably consistent across the ecosystem.

The convergence of official specifications, industry standards, and community practices around these conventions represents one of Java's most successful standardization efforts, providing developers with clear, unambiguous guidance that scales from personal projects to enterprise applications.