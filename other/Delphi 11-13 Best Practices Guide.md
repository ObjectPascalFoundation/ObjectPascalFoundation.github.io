# Standards and Best Practices for Modern Delphi (v11-13)

The Object Pascal language, functioning as the foundational architecture
for the Delphi development environment, has long been celebrated for its
strict typing, inherent readability, and elegantly structured design.
Over the decades, the language has evolved dramatically from its early
Borland iterations to the highly sophisticated, cross-platform capable
toolchains of RAD Studio Athens (Delphi 12) and Florence (Delphi 13).
With the introduction of modern language paradigms---such as inline
variable declarations, the ternary conditional operator, intrinsic
compiler functions, and advanced generic collections---the necessity for
an updated, cohesive set of coding standards has become absolute.
Establishing a unified style guide is not merely an aesthetic endeavor;
it is a critical software engineering practice that directly impacts
code maintainability, memory safety, and collaborative efficiency. The
human mind relies on pattern recognition to assimilate logic rapidly,
and when a codebase adheres strictly to predictable naming conventions,
structural layouts, and modern memory management paradigms, the
cognitive load required to debug, refactor, and extend the application
is drastically reduced.^1^

Furthermore, the integration of third-party libraries, modern source
control systems, and automated continuous integration and continuous
deployment (CI/CD) pipelines demands a standardized approach to project
architecture and file encoding. To address these demands, this
comprehensive report synthesizes the official Embarcadero Object Pascal
Style Guide, industry-standard legacy frameworks, and modern community
best practices. It establishes a definitive hierarchy of best practices,
explicitly prioritizing modern Delphi constructs while identifying areas
of historical disagreement requiring manual architectural decisions.

## Prioritization Methodology and Source Hierarchy

When establishing a unified standard for a language with a multi-decade
history, conflicting stylistic guidelines inevitably arise. To resolve
these conflicts and synthesize a definitive guide for modern
development, a strict prioritization hierarchy has been applied to the
available literature and community standards. This methodology ensures
that the resulting guide optimizes for the compiler behaviors and
language features present specifically in Delphi 11 (Alexandria), Delphi
12 (Athens), and Delphi 13 (Florence).

The highest priority is assigned to the official, updated Embarcadero
Object Pascal Style Guide, originally curated by Charlie Calvert and
recently modernized by Delphi Product Manager Marco Cantu, with
contributions from the internal Research and Development team and Delphi
Most Valuable Professionals (MVPs).^2^ This document explicitly
supersedes legacy Borland guidelines and reflects the exact stylistic
requirements enforced within Embarcadero\'s own source code
repository.^3^

The secondary priority is granted to modern, community-driven expert
guidelines that explicitly target Delphi 10.3 and above. These include
the architectural standards defined by Olaf Monien for the DX.Logger
repository ^5^, the memory safety and clean code paradigms advocated by
GDK Software ^7^, and the contribution guidelines maintained by Stefan
Glienke for the Spring4D framework.^10^ These sources provide crucial
pragmatic adaptations for features like inline variables, generics, and
automated memory management that the official style guide may only
briefly touch upon.

The third tier of priority encompasses legacy official documentation,
such as the original Borland Object Pascal Style Guide.^1^ While much of
this document remains foundational, its guidelines regarding archaic
features (such as unscoped enumerations or 8:3 file naming conventions)
have been explicitly deprecated in favor of modern equivalents.^1^

The lowest priority is assigned to legacy third-party community
standards, most notably the Raize Software Delphi Coding Style Guide and
the conventions outlined in the Delphi 5 Developer\'s Guide.^11^ While
these documents were highly influential in the late 1990s and 2000s,
many of their strictures---such as excessive Hungarian notation and
rigid variable centralization---actively conflict with modern Delphi
language features. Data from these sources is only integrated when it
does not contradict the higher-tier modern guidelines, serving primarily
to fill gaps regarding component naming and legacy code maintenance.

## Lexical Standards and Naming Conventions

The foundation of readable Object Pascal code lies in its naming
conventions. While the Delphi compiler is largely case-insensitive and
ignores arbitrary whitespace, human developers rely heavily on casing
and prefixes to understand variable scope, type metadata, and object
lifecycles at a glance. In an ecosystem where modern tools like the
Delphi Language Server Protocol (LSP) and Language Server Index Format
(LSIF) provide real-time code completion, adhering to strict lexical
standards significantly accelerates developer velocity.^13^

### Core Identifier Rules and PascalCasing

All identifiers must utilize PascalCase, a convention where the first
character is an uppercase alphabetic letter, and the first letter of
each subsequent concatenated word is also capitalized.^6^ Underscores
must be strictly avoided in standard identifiers, as they break the
visual consistency of the Object Pascal ecosystem and are historically
reserved for C/C++ interoperability headers or specific macro-level
constants.^11^ Descriptive names must always be prioritized over terse
abbreviations. A method named GetSystemMetrics is vastly superior to
GetSysMet, as it conveys immediate, unambiguous intent to the consumer
of the Application Programming Interface (API).^11^

Reserved words and standard compiler directives (such as begin, class,
override, abstract, and implementation) must always remain entirely
lowercase.^11^ The Integrated Development Environment natively
highlights these keywords, and applying PascalCase or uppercase to them
creates severe visual dissonance. The only exception to this
capitalization rule applies to single-letter loop control variables,
such as I, J, or K, which are traditionally capitalized despite not
forming complete words.^11^ However, modern guidelines increasingly
tolerate lowercase loop counters (i, j) as an acceptable exception,
provided the scope is strictly constrained within an inline
declaration.^6^

### Prefixing Typology

To provide immediate contextual metadata, modern Delphi development
adheres to a strict prefixing strategy. This practice prevents naming
collisions between local variables, parameters, and class fields, which
is especially critical in complex methods where shadowing variables
could lead to disastrous logic errors.

  --------------------------------------------------------------------------------------
  **Element      **Required     **Naming       **Example Identifier**   **Context and
  Category**     Prefix**       Convention**                            Architectural
                                                                        Reasoning**
  -------------- -------------- -------------- ------------------------ ----------------
  Classes and    T              PascalCase     TCustomer,               Identifies the
  Types                                        TNetworkStream           identifier as a
                                                                        type definition,
                                                                        distinguishing
                                                                        it from variable
                                                                        instances.
                                                                        Essential for
                                                                        compiler
                                                                        resolution.^6^

  Interfaces     I              PascalCase     ILogger, IChangeNotifier Crucial for
                                                                        indicating that
                                                                        the object
                                                                        relies on
                                                                        Automatic
                                                                        Reference
                                                                        Counting (ARC)
                                                                        rather than
                                                                        manual memory
                                                                        management.^6^

  Exceptions     E              PascalCase     EFileNotFoundException   Alerts the
                                                                        developer that
                                                                        the class is
                                                                        designed
                                                                        exclusively for
                                                                        error handling
                                                                        and derives from
                                                                        the base
                                                                        Exception
                                                                        class.^6^

  Fields         F              PascalCase     FConnectionString        Maps backing
  (Internal)                                                            fields directly
                                                                        to their
                                                                        corresponding
                                                                        properties
                                                                        without naming
                                                                        collisions.
                                                                        Ensures
                                                                        encapsulation is
                                                                        visually
                                                                        apparent.^6^

  Local          L              PascalCase     LResult, LQuery          Differentiates
  Variables                                                             local scope from
                                                                        parameters and
                                                                        fields. Prevents
                                                                        accidental
                                                                        mutation of
                                                                        class state when
                                                                        working within
                                                                        complex
                                                                        methods.^6^

  Parameters     A              PascalCase     AMessage, AOwner         Indicates an
                                                                        Argument passed
                                                                        into the
                                                                        routine. Ensures
                                                                        that parameters
                                                                        do not shadow
                                                                        local variables
                                                                        or internal
                                                                        class fields.^6^

  Constants      c or C\_       PascalCase /   cMaxRetries, C_MAX_SIZE  Standardizes
                                UPPER_SNAKE                             immutable
                                                                        values. String
                                                                        constants
                                                                        frequently
                                                                        utilize the sc
                                                                        prefix to denote
                                                                        their specific
                                                                        memory
                                                                        footprint.^5^
  --------------------------------------------------------------------------------------

### Visual Component Naming Conventions

When utilizing the Visual Component Library (VCL) or the cross-platform
FireMonkey (FMX) framework, the IDE automatically assigns default names
to newly instantiated components. Identifiers such as Button1, Edit2, or
Panel4 populate the form file and the backing code. Relying on these
default names in production code is universally considered a severe
anti-pattern, as it completely obscures the business purpose of the user
interface elements.

Components that are referenced in code or have event handlers attached
must be renamed using a standard three-character lowercase prefix
followed by a descriptive PascalCase name.^11^ This practice serves a
dual purpose: it instantly identifies the object\'s class type within
the code, and it forces the Object Inspector to group identical
component types together alphabetically during design time, drastically
improving discoverability within complex forms.^11^

  -----------------------------------------------------------------------
  **Component Class       **Standard Prefix**     **Example Identifier**
  Type**                                          
  ----------------------- ----------------------- -----------------------
  TAction                 act                     actSaveDocument

  TButton                 btn                     btnSubmitOrder

  TCheckBox               chk                     chkEnableLogging

  TComboBox               cbx                     cbxCountrySelection

  TEdit / TMemo           edt                     edtFirstName

  TForm                   frm                     frmCustomerDetails

  TLabel                  lbl                     lblWarningMessage

  TListBox                lst                     lstAvailableUsers

  TMenuItem               mnu                     mnuFileOpen

  TPanel                  pnl                     pnlNavigation
  -----------------------------------------------------------------------

Static labels (TLabel) that never change at runtime, do not provide
dynamic data mapping, and lack event handlers may retain their default
names to save development time. However, renaming is strictly required
if their Caption properties are mutated dynamically via code or
LiveBindings.^11^

## Whitespace, Structural Layout, and Code Formatting

Whitespace in Object Pascal dictates the psychological flow of the
logic. Consistent indentation and spacing prevent the codebase from
becoming a dense, unreadable block of text, thereby reducing the time
required for peer reviews and maintenance. The Delphi compiler ignores
arbitrary whitespace, granting the developer complete flexibility, but
this flexibility mandates rigorous discipline to maintain
readability.^3^

### Indentation and Spacing Mechanics

Hard tab characters are strictly forbidden in modern Delphi codebases.
Tabs render differently depending on the IDE, the version control
system, or the individual text editor, leading to misaligned blocks and
degraded readability when code is reviewed on platforms like GitHub or
GitLab.^12^ All indentation must consist of exactly two space characters
per logical level.^5^ Within the Delphi IDE Editor Options, the settings
for \"Use Tab Character\" and \"Optimal Fill\" must be unchecked to
prevent the editor from stealthily injecting tabs during automated
formatting.^11^

Line lengths should generally not exceed 80 to 120 characters to ensure
that code can be viewed side-by-side on modern high-resolution monitors
without horizontal scrolling.^6^ If a statement exceeds this width, it
must be wrapped after an operator or a comma, never before. The
continuation line must be indented by two spaces relative to the
beginning of the initial statement to visually indicate that it is part
of the preceding logical block.^15^

Spaces must be applied symmetrically around binary operators to separate
the operands visually. For example, A := B + C; is correct, whereas
A:=B+C; is a violation of the style guide.^11^ Spaces must also be
included after commas in parameter lists and after the colon in variable
declarations.^11^ Conversely, spaces must never be placed between a
method name and its opening parenthesis, nor directly inside parentheses
or brackets. The syntax CallProc( AParameter ); is an anti-pattern;
CallProc(AParameter); is the officially sanctioned standard.^15^ When
utilizing generic type parameters, no spaces should exist inside the
angle brackets, ensuring that TList\<Integer\> is favored over TList\<
Integer \>.^11^

### Control Structures and Block Alignment

The begin and end keywords define the boundaries of compound statements
in Object Pascal. A persistent standard across official and legacy
guidelines dictates that begin should generally appear on its own line,
perfectly aligned with the control statement that precedes it, while the
enclosed statements are indented by two spaces.^12^

When a control structure contains only a single executable statement,
the begin and end keywords may be omitted to reduce vertical bloat and
improve the density of the code on the screen. However, if an else
clause is present, the terminal semicolon must be omitted from the
preceding statement. This syntactic quirk of Pascal requires careful
attention during refactoring, as accidentally leaving a semicolon before
an else keyword will result in an immediate compiler error.^19^

Method declarations must be separated by exactly two blank lines to
provide visual breathing room between distinct algorithmic
processes.^11^ Within a method body, single blank lines should be used
sparingly to separate discrete logical operations, such as the initial
setup phase, the primary execution loop, and the finalization block.^17^
Blank lines must never be placed immediately following a begin statement
or immediately preceding an end statement, as this creates artificial
separation within a unified logical block.^17^

## Code Documentation and Commenting Strategy

Code should be inherently self-documenting through the rigorous
application of the naming conventions and architectural patterns
detailed above.^5^ When comments are necessary to explain complex
algorithmic decisions, business logic edge cases, or external API
requirements, specific formatting rules apply. The goal is to provide
context without cluttering the screen with redundant information that
merely repeats what the syntax already explicitly states.

Single-line comments must use the // syntax and should be placed either
on the line directly preceding the relevant code (indented to the same
level) or trailing the code separated by at least one space
character.^11^ Multi-line block comments must utilize the curly brace
syntax { }.^11^ The alternative star-parenthesis syntax (\* \*) must be
strictly reserved for temporarily commenting out blocks of code during
debugging sessions.^6^ By reserving (\* \*) for debugging, developers
ensure that any nested { } comments within the disabled block do not
prematurely terminate the comment parser, which is a common source of
compilation frustration in older codebases.

For public API boundaries, reusable components, and shared architectural
units, XML Documentation comments must be utilized. Introduced with a
triple-slash ///, these comments are natively parsed by the Delphi IDE
to provide rich tooltip information via the Language Server Protocol and
the Help Insight engine.^5^ XML comments support standard tags such as
\<summary\>, \<param\>, and \<returns\>, allowing for the automated
generation of comprehensive API documentation. The space between the ///
prefix and the XML tag is mandatory, and there must be no blank lines
between the XML comment block and the symbol it documents.^20^

## Modern Language Paradigms

The most significant shifts in Delphi coding standards stem from the
language evolution culminating in RAD Studio Florence (Delphi 13).
Traditional Object Pascal enforced a strict separation between variable
declaration and execution, requiring all variables to be declared in a
var block at the top of a routine. While this promoted a unified view of
memory allocation, it frequently resulted in excessive variable scoping,
unintended reuse of loop counters, and increased cognitive distance
between a variable\'s declaration and its initialization. Modern Delphi
has introduced several features designed to alleviate these historical
constraints while maintaining the language\'s reputation for type
safety.

### Inline Variable Declarations and Type Inference

Introduced in earlier compiler iterations but solidified as an
indispensable best practice in Delphi 11 through 13, inline variable
declarations allow variables to be declared and initialized
simultaneously at the exact point of their first use.^6^ This paradigm
offers profound benefits for code safety and readability, directly
addressing concerns regarding memory misuse and unintended state
mutation.

By declaring a variable within a tightly constrained block, such as
immediately before its initialization or directly inside a for loop, its
scope is strictly limited to that specific block of execution.^7^ This
architectural change entirely eliminates the possibility of out-of-scope
access errors or unintended state leakage between loop iterations, which
is a common source of logic bugs in legacy Delphi code.^7^ Furthermore,
inline declarations support compiler type inference. By utilizing the :=
operator during declaration, the compiler evaluates the right-hand
expression and implicitly assigns the correct static type to the
variable.^21^ This reduces boilerplate verbosity while maintaining the
compiler\'s strict static typing, ensuring type safety without requiring
redundant explicit type definitions.

### The Ternary Conditional Operator

For decades, the Delphi community relied on the System.Math.IfThen and
System.StrUtils.IfThen functions to simulate inline conditional
assignments. However, these utility functions suffer from a critical
architectural flaw: they are standard functions, meaning the compiler
eagerly evaluates all arguments before invoking the routine.^22^ If the
false-condition argument contains a heavy computational routine,
performs a database query, or attempts to access a null pointer, the
application incurs severe performance penalties or raises an access
violation, completely negating the purpose of the conditional check.^22^

Delphi 13 Florence fundamentally resolves this limitation by introducing
a native ternary conditional operator using an overloaded inline if
syntax.^23^ Because this is a native compiler operator rather than a
runtime function, it employs lazy evaluation (short-circuiting). Only
the specific sub-expression corresponding to the evaluated boolean
condition is executed, representing a massive leap in both performance
optimization and syntactical safety.^23^

When adopting the ternary operator, developers must be acutely aware of
operator precedence. The inline if operator possesses a lower precedence
than standard arithmetic or string concatenation operators. Therefore,
mixing the ternary operator within larger string manipulations or
mathematical calculations requires explicit parenthetical grouping to
prevent compiler evaluation errors or unintended logical outcomes.^23^
Without proper grouping, the compiler will attempt to concatenate the
boolean result with the string, leading to syntax failures.

  -----------------------------------------------------------------------
  **Ternary               **Syntactical Example** **Evaluation Behavior**
  Implementation                                  
  Strategy**                                      
  ----------------------- ----------------------- -----------------------
  Legacy IfThen Function  Result :=               **Eager**: Evaluates
                          IfThen(Assigned(Obj),   Obj.Name even if Obj is
                          Obj.Name, \'\');        nil, causing an Access
                                                  Violation.^22^

  Modern Ternary Operator Result := if            **Lazy**: Safely
                          Assigned(Obj) then      bypasses Obj.Name
                          Obj.Name else \'\';     evaluation if the
                                                  object is nil.^23^

  Improper Precedence     Result := \'Name: \' +  **Failure**: The
                          if Assigned(Obj) then   compiler evaluates
                          Obj.Name else \'None\'; the + operator before
                                                  the if operator.^23^

  Standardized Precedence Result := \'Name: \' +  **Safe**: Explicit
                          (if Assigned(Obj) then  parentheses guarantee
                          Obj.Name else           the intended order of
                          \'None\');              operations.^23^
  -----------------------------------------------------------------------

### The NameOf Intrinsic Compiler Function

Refactoring large corporate codebases frequently introduces silent
regressions when string literals contain hardcoded variable, class, or
method names. If a method is renamed using the IDE\'s refactoring tools,
the raw string literals remain unchanged, leading to runtime failures in
logging telemetry, reflection frameworks, or component binding logic.

To eradicate this class of bugs, Delphi 13 introduces the NameOf
intrinsic compiler magic function.^24^ NameOf(Symbol) instructs the
compiler to evaluate the provided symbol and return its identifier as a
string at compile time. If the target symbol is subsequently renamed,
the compiler automatically updates the NameOf output. If the symbol is
deleted entirely, the compiler throws a compilation error, guaranteeing
absolute consistency between the codebase and its telemetry output.^27^

This function is restricted to identifiers and cannot parse arbitrary
mathematical expressions or yield fully qualified namespace chains
unless explicitly provided with the full path.^27^ The NameOf function
has rapidly become a required standard for robust try..except logging
blocks, where hardcoding the method name in the error output is now
considered a severe anti-pattern.^27^

## Memory Management, Safety, and Architectural Paradigms

The transition to cross-platform mobile development temporarily
introduced Automatic Reference Counting (ARC) for all object types in
Delphi. However, Embarcadero ultimately reversed this decision to
preserve compatibility with millions of lines of legacy Windows code,
unifying all platforms under the classic manual memory management model
for standard objects, while retaining ARC exclusively for interfaces and
strings.^28^ Consequently, disciplined memory management remains a
foundational requirement for Delphi safety standards.

### Mitigating Memory Vulnerabilities

Unmanaged memory allocations, buffer overflows, and insidious memory
leaks are primary vectors for software instability and security
exploits. A recent report by the United States White House Office of the
National Cyber Director explicitly highlighted memory safety as a
critical imperative for modern software engineering.^9^ To achieve
absolute memory safety, raw pointer manipulation and manual AllocMem or
FreeMem calls should be entirely avoided in modern application code.
Developers must leverage Delphi\'s dynamically managed types, such as
the native string type (which manages its own reference counting and
buffer allocation) and dynamic arrays (TArray\<T\>), which inherently
prevent buffer overflows by validating bounds and automating memory
deallocation.^7^

### Resource Lifecycle Management

When an object is instantiated, its lifecycle must be guaranteed by a
strict try..finally block. Failing to wrap object usage in a
try..finally structure risks permanent memory leaks if an unhandled
exception disrupts the execution flow before the destruction method is
reached.^5^

A critical modern standard dictates the absolute use of
System.SysUtils.FreeAndNil over the standard .Free method for object
destruction, particularly for class fields or globally scoped
variables.^6^ While .Free safely checks if an instance is already null
before calling the destructor, it leaves the variable\'s pointer intact,
pointing to the now-freed memory address. Subsequent attempts to
evaluate Assigned(LObject) will return true, leading to fatal Access
Violations if the object is accessed. FreeAndNil circumvents this
catastrophic failure by executing the destruction and atomically
nullifying the pointer, ensuring that state checks remain permanently
valid.^7^

### Interface-Based Architecture and Smart Pointers

To minimize the visual boilerplate associated with manual try..finally
blocks, modern Delphi architecture heavily favors interface-driven
design. Because interfaces are inherently managed by ARC, assigning an
object implementation to an interface reference guarantees that the
object will be automatically destroyed the exact moment the interface
variable falls out of scope, regardless of whether an exception
occurred.^7^

However, implementing IInterface requires defining reference counting
methods (\_AddRef, \_Release), which adds unnecessary complexity to
simple data transfer objects. To apply ARC principles to standard
un-interfaced objects, modern codebases rely on advanced third-party
libraries such as the open-source Spring4D framework. Spring4D
introduces the Shared\<T\> smart pointer record type.^7^ By wrapping a
standard object instantiation in a Shared\<T\> record, developers
completely offload memory management to the compiler\'s native
record-initialization and finalization routines.^30^ This allows for the
rapid creation of complex objects without the requisite cleanup
boilerplate, drastically improving code readability and safety.

## Generics, Collections, and Third-Party Frameworks

The era of utilizing untyped collections such as TList and
TObjectList---which required constant, unsafe typecasting and obscured
the underlying data architecture---is decisively over. The
System.Generics.Collections unit provides heavily optimized, strongly
typed data structures that enforce compile-time safety and eliminate
runtime casting errors entirely.^7^

When managing fixed-size contiguous memory blocks, TArray\<T\> is the
preferred standard due to its raw iteration performance and minimal
memory overhead.^6^ For dynamic lists requiring frequent insertions or
deletions, TList\<T\> is required, while TObjectList\<T\> must be used
when the collection is strictly responsible for owning and eventually
destroying its contained objects.^6^

For highly specialized performance requirements, modern standards
advocate extending the base runtime library with established open-source
alternatives. The Spring4D framework elevates Delphi\'s collection
architecture by introducing interface-backed collections such as
IList\<T\>, IDictionary\<K,V\>, and IMultiMap\<K,V\>.^30^ These
interfaces provide Language Integrated Query (LINQ) functional
capabilities, allowing developers to utilize anonymous methods for
immediate data querying without writing verbose for loops.^30^
Furthermore, IList\<T\> supports read-only views via the AsReadOnlyList
method, enforcing strict immutability across API boundaries.^30^

In scenarios requiring unique item validation without the memory
overhead of key-value pair mapping, the standard TDictionary\<K,V\> is
inefficient. To resolve this, the Grijjy Foundation library introduces
TgoSet\<T\>, a generic hash-set implementation that provides rapid O(1)
item lookups while conserving memory by omitting the dummy values
required by standard dictionary implementations.^18^

## Project Architecture and Source Control Optimization

As Delphi integration with automated build systems, static code analysis
tools (such as SonarQube for Delphi), and Git-centric workflows has
matured, monolithic directory structures have been completely abandoned
in favor of strict repository isolation.^7^

A modern Delphi project repository must enforce a rigid separation of
concerns at the file-system level to prevent source file contamination
and streamline compilation pipelines.^32^ The src directory must contain
exclusively .pas source files, forms (.dfm or .fmx), and data modules.
No binary artifacts are permitted in this directory. A dedicated lib or
modules directory must house all third-party dependencies, Git
submodules, and standalone package files.^33^ Target directories for the
compiler\'s output, typically named bin for executables and dcu for
compiled units, must be dynamically routed via the project\'s IDE
configuration. These output folders must be strictly ignored by version
control to prevent repository bloat.^35^ Furthermore, a tests directory
must contain isolated DUnitX test projects, ensuring that business logic
validation occurs without polluting the production application
binaries.^5^

All Delphi source files must be saved using UTF-8 with BOM (Byte Order
Mark) encoding.^5^ Failing to enforce this encoding standard leads to
corrupted string literals and syntax errors when code containing
international characters is compiled across different regional operating
systems. Additionally, line endings must be explicitly normalized to
CRLF (Windows style) via a .gitattributes file. This prevents the
version control history from becoming polluted with microscopic
formatting differences when developers collaborate across varied
environments, ensuring that pull requests remain focused entirely on
logic rather than invisible whitespace characters.^5^

Under no circumstances should API keys, database credentials, or
external service tokens be hardcoded into the Delphi source files.^5^
Configuration should be injected at runtime via environmentally isolated
config.local.ini files, which must be strictly blacklisted in the
.gitignore configuration to prevent credential leakage into the
repository, mitigating critical security vulnerabilities.^5^

## Areas of Disagreement and Manual Refinement

While synthesizing official, legacy, and community standards yields a
largely unified approach to modern Delphi development, several areas of
philosophical and architectural disagreement persist. These
discrepancies highlight the natural tension between strict backwards
compatibility and the aggressive adoption of modern, pragmatic
paradigms. Engineering teams must manually codify their stance on these
specific issues within their internal style guides to prevent formatting
fragmentation and ideological conflicts during code reviews.

### 1. Hungarian Notation Prefixing versus Scoped Enumerations

Historically, the Object Pascal compiler placed all enumeration values
into the global namespace. To prevent catastrophic naming collisions,
legacy standards mandated that all enumeration values begin with a
two-to-three character lowercase prefix derived directly from the
enumeration\'s type name. For instance, the TFontStyles enumeration
required values such as fsBold and fsItalic.^11^

Modern Delphi resolves this namespace pollution by supporting scoped
enumerations via the {\$SCOPEDENUMS ON} compiler directive, which
requires the developer to explicitly qualify the value with its type
name (e.g., TFontStyles.Bold). The updated Embarcadero Style Guide
indicates that scoped enumerations render the Hungarian-style prefixes
obsolete, recommending their complete removal to reduce syntactical
redundancy.^11^

For newly engineered codebases, scoped enumerations without prefixes
represent the cleanest, most modern architectural approach. However, if
a project heavily integrates with legacy VCL components that rely
intrinsically on older globally-scoped enumerations, adopting scoped
enumerations for new business logic can lead to jarring syntactical
inconsistencies within the same method. Teams must actively choose a
single paradigm: enforce scoped enumerations exclusively for all
internal business logic to promote modernity, or retain the legacy
prefixes globally to ensure visual consistency with the underlying VCL
source code.

### 2. Traditional Centralized Variable Blocks versus Inline Variable Declarations

Traditional Pascal purists argue that centralizing all variable
declarations within a dedicated var block at the apex of a routine
allows a developer to instantly ascertain the total memory footprint and
dependencies of the method before reading the execution logic. They
contend that inline variables, especially those utilizing type
inference, obscure the strict static typing nature of the language,
making it difficult to determine the exact type of a variable without
relying on IDE tooltip assistance.^21^

Conversely, modernists emphasize that inline declarations fundamentally
enhance code safety and psychological locality. By localizing variables
to the exact execution block where they are utilized, the risk of
uninitialized access or accidental reuse of loop iterators is entirely
neutralized.^7^ It also drastically reduces the vertical distance a
developer\'s eyes must travel to understand a variable\'s purpose,
keeping the context immediately relevant.

The security and scope-limitation benefits of inline variables
overwhelmingly outweigh the traditionalist aesthetic arguments.^7^ The
standard should aggressively enforce inline variables for all transient
loop counters, temporary generic instantiations, and narrowly scoped
conditionals. Traditional var blocks should be reserved solely for
complex, multi-stage routines where variables must legitimately maintain
state across the entire method lifecycle.

### 3. Ternary Operator Adoption versus Traditional Control Structures

The introduction of the ternary operator in Delphi 13 has sparked
significant debate regarding its impact on readability. Detractors argue
that nesting ternary operators or placing complex business logic within
an inline if statement violates the explicit, verbose readability that
defines Object Pascal. They argue that traditional if..then..else
blocks, while vertically longer, are universally comprehensible and
easier to debug when stepping through code line-by-line.^38^

Proponents highlight that the ternary operator eradicates unnecessary
intermediate variables, collapses multi-line boilerplate assignments
into a single, elegant line, and is inherently safer than the legacy
IfThen functions due to its robust lazy evaluation architecture.^23^

The ternary operator should be embraced, but its usage must be strictly
regulated. Its application must be confined to simple, single-variable
assignment operations or parameter passing where the boolean condition
and the resulting outcomes are immediately obvious.^39^ Nested ternary
operators (e.g., X := if A then B else if C then D else E) should be
categorically banned in corporate style guides, as they severely degrade
readability and complicate visual parsing. If a conditional assignment
requires multi-line logic, complex boolean evaluations, or nested
checks, a traditional if..then..else block remains mandatory.

### 4. Parameter Directionality: out versus var

Object Pascal provides several parameter modifiers to dictate how data
is passed into a routine. The var modifier passes a variable by
reference, allowing the routine to mutate the existing data. The out
modifier also passes by reference but implies that the incoming value is
irrelevant and will be entirely overwritten by the routine.

While out parameters theoretically provide better semantic clarity
regarding the routine\'s intent, they introduce an insidious performance
overhead in Delphi. The compiler enforces mandatory implicit
initialization for out parameters (particularly for managed types like
strings and interfaces), clearing the variable before the routine even
begins execution. Stefan Glienke, the lead maintainer of the Spring4D
framework, explicitly advocates for replacing out parameters with var
parameters in high-performance collections to avoid this \"completely
insane overhead\".^10^

Teams developing high-frequency algorithms, game engines, or low-latency
data processors should strongly consider standardizing on var parameters
exclusively, utilizing XML documentation comments to indicate when a
parameter is intended solely for output. However, teams prioritizing
semantic purity over microscopic performance gains may continue to
utilize the out modifier.

### 5. Whitespace Inconsistencies in Arrays and Parentheses

The official Embarcadero guidelines explicitly prohibit inserting a
space before an opening square bracket for an array declaration (e.g.,
array\[0..100\] of Char).^37^ However, the documentation transparently
acknowledges that the core Delphi libraries themselves lack consistency
on this rule. The SysUtils and FMX.Types units frequently violate the
rule, whereas the modern Generics.Collections unit adheres strictly to
the omission of the space.^37^ A similar discrepancy exists regarding
spacing inside parentheses for function calls, where some legacy
enterprise guides allowed padding to improve visual separation, but
modern automated formatters strip it away.^16^

Engineering teams must rely exclusively on the Delphi IDE\'s built-in
Code Formatter (Ctrl+D) to enforce these rules. By configuring the
formatter settings once and committing the resulting configuration file
to version control, teams can entirely automate the resolution of
spacing disputes. This delegates the enforcement of strict
adherence---such as the no-space rule for array brackets and
parentheses---to the tooling, ensuring absolute consistency across the
entire repository without requiring human intervention during code
reviews.^41^

## Conclusion

The modernization of a Delphi application is not accomplished solely by
recompiling a legacy codebase using the newest RAD Studio Florence
toolchain. True modernization requires a fundamental paradigm shift in
how the language is written, structured, and maintained. The synthesized
standards detailed in this report bridge the critical gap between Object
Pascal\'s historical design philosophy and the rigorous realities of
contemporary software engineering.

By enforcing strict PascalCase naming conventions and contextual
prefixes, developers eliminate ambiguity and enhance the efficacy of IDE
tooling. By optimizing variable scope through inline declarations and
replacing unsafe utility functions with the natively integrated ternary
operator, teams can systematically eradicate entire classes of memory
and logic bugs before they reach production. Furthermore, the
integration of advanced concepts like Spring4D\'s Shared\<T\> interfaces
shifts the burden of memory lifecycle management from the developer
directly to the compiler, aligning Delphi\'s capabilities with other
top-tier managed languages without sacrificing the raw execution speed
and deterministic behavior of native compilation.

The longevity and stability of any large-scale application hinge on the
predictability of its source code. Teams that aggressively adopt these
Delphi 11-13 standards, automate their enforcement via IDE formatting
profiles, and maintain disciplined project architectures will find their
codebases vastly more resilient, secure, and prepared for future
technological integrations. Utilizing modern Object Pascal to its
fullest potential ensures that Delphi remains a premier choice for
developing high-performance, maintainable software systems.

#### Works cited

1.  Object Pascal Style Guide, accessed March 30, 2026,
    [[https://ia800603.us.archive.org/18/items/ObjectPascalStyleGuide_201708/SoftwareEngineering/Object%20Pascal%20Style%20Guide.pdf]{.underline}](https://ia800603.us.archive.org/18/items/ObjectPascalStyleGuide_201708/SoftwareEngineering/Object%20Pascal%20Style%20Guide.pdf)

2.  Delphi\'s Object Pascal Style Guide - RAD Studio, accessed March 30,
    2026,
    [[https://docwiki.embarcadero.com/RADStudio/en/Delphi%E2%80%99s_Object_Pascal_Style_Guide]{.underline}](https://docwiki.embarcadero.com/RADStudio/en/Delphi%E2%80%99s_Object_Pascal_Style_Guide)

3.  New Delphi\'s Object Pascal Style Guide - Marco Cantu\'s Blog,
    accessed March 30, 2026,
    [[https://blog.marcocantu.com/blog/2021-april-object-pascal-style-guide.html]{.underline}](https://blog.marcocantu.com/blog/2021-april-object-pascal-style-guide.html)

4.  New Delphi\'s Object Pascal Style Guide - Embarcadero Blogs,
    accessed March 30, 2026,
    [[https://blogs.embarcadero.com/new-delphis-object-pascal-style-guide/]{.underline}](https://blogs.embarcadero.com/new-delphis-object-pascal-style-guide/)

5.  DX.Logger/CONTRIBUTING.md at master · omonien/DX.Logger \...,
    accessed March 30, 2026,
    [[https://github.com/omonien/DX.Logger/blob/master/CONTRIBUTING.md]{.underline}](https://github.com/omonien/DX.Logger/blob/master/CONTRIBUTING.md)

6.  Delphi Style Guide EN.md - GitHub, accessed March 30, 2026,
    [[https://github.com/omonien/DX.Logger/blob/master/docs/Delphi%20Style%20Guide%20EN.md]{.underline}](https://github.com/omonien/DX.Logger/blob/master/docs/Delphi%20Style%20Guide%20EN.md)

7.  Enhancing Delphi Code Safety: Best practices, tools, and context
    \..., accessed March 30, 2026,
    [[https://gdksoftware.com/knowledgebase/enhancing-delphi-code-safety-best-practices-tools-and-context]{.underline}](https://gdksoftware.com/knowledgebase/enhancing-delphi-code-safety-best-practices-tools-and-context)

8.  Delphi Programming Checklist \| PDF - Scribd, accessed March 30,
    2026,
    [[https://www.scribd.com/document/721710095/SOLID-Delphi-Programming-Checklist]{.underline}](https://www.scribd.com/document/721710095/SOLID-Delphi-Programming-Checklist)

9.  Memory Safety with Delphi - Jim McKeeth - Webinar June 2024 \| PDF -
    Slideshare, accessed March 30, 2026,
    [[https://www.slideshare.net/slideshow/memory-safety-with-delphi-jim-mckeeth-webinar-june-2024/269590107]{.underline}](https://www.slideshare.net/slideshow/memory-safety-with-delphi-jim-mckeeth-webinar-june-2024/269590107)

10. April 2021 - Delphi sorcery, accessed March 30, 2026,
    [[https://delphisorcery.blogspot.com/2021/04/?m=0]{.underline}](https://delphisorcery.blogspot.com/2021/04/?m=0)

11. Delphi Coding Style Guide - Raize Software, accessed March 30, 2026,
    [[https://raize.com/wp-content/uploads/RaizeDelphiCodingStyleGuide.pdf]{.underline}](https://raize.com/wp-content/uploads/RaizeDelphiCodingStyleGuide.pdf)

12. Coding Standards Document, accessed March 30, 2026,
    [[http://box.cs.istu.ru/public/docs/other/\_New/Books/Lang/Delphi/Delphi%20Developer\'s%20Guide/Ebooks/d5dg/chapter6.pdf]{.underline}](http://box.cs.istu.ru/public/docs/other/_New/Books/Lang/Delphi/Delphi%20Developer's%20Guide/Ebooks/d5dg/chapter6.pdf)

13. Announcing the Availability of RAD Studio 13 Florence Update 1 -
    Embarcadero Blogs, accessed March 30, 2026,
    [[https://blogs.embarcadero.com/announcing-the-availability-of-rad-studio-13-florence-update-1/]{.underline}](https://blogs.embarcadero.com/announcing-the-availability-of-rad-studio-13-florence-update-1/)

14. New release: RAD Studio 13.1 Florence - Grey Matter, accessed March
    30, 2026,
    [[https://greymatter.com/content-hub/new-release-rad-studio-13-1-florence/]{.underline}](https://greymatter.com/content-hub/new-release-rad-studio-13-1-florence/)

15. Delphi Developer\'s Guide Coding Standards Document, accessed March
    30, 2026,
    [[http://www.sourceformat.com/coding-standard-delphi-econos.htm]{.underline}](http://www.sourceformat.com/coding-standard-delphi-econos.htm)

16. Delphi 5 Coding Standards Guide \| PDF \| Method (Computer
    Programming) - Scribd, accessed March 30, 2026,
    [[https://www.scribd.com/document/721710080/delphi5dg]{.underline}](https://www.scribd.com/document/721710080/delphi5dg)

17. White Space Usage - RAD Studio - Embarcadero DocWiki, accessed March
    30, 2026,
    [[https://docwiki.embarcadero.com/RADStudio/en/White_Space_Usage]{.underline}](https://docwiki.embarcadero.com/RADStudio/en/White_Space_Usage)

18. Expand your Collections collection -- Part 1: a generic set - grijjy
    blog, accessed March 30, 2026,
    [[https://blog.grijjy.com/2017/01/05/expand-your-collections-collection-part-1-a-generic-set/]{.underline}](https://blog.grijjy.com/2017/01/05/expand-your-collections-collection-part-1-a-generic-set/)

19. Proper structure syntax for Delphi/Pascal if then begin end and ; -
    Stack Overflow, accessed March 30, 2026,
    [[https://stackoverflow.com/questions/28221394/proper-structure-syntax-for-delphi-pascal-if-then-begin-end-and]{.underline}](https://stackoverflow.com/questions/28221394/proper-structure-syntax-for-delphi-pascal-if-then-begin-end-and)

20. Comments - RAD Studio - Embarcadero DocWiki, accessed March 30,
    2026,
    [[https://docwiki.embarcadero.com/RADStudio/en/Delphi_Comments]{.underline}](https://docwiki.embarcadero.com/RADStudio/en/Delphi_Comments)

21. Thoughts on Inline Variable Declarations in Pascal - tim coates -
    WordPress.com, accessed March 30, 2026,
    [[https://timcoatesinsights.wordpress.com/2025/06/02/inline-variable-declarations-in-pascal-progress-or-problem/]{.underline}](https://timcoatesinsights.wordpress.com/2025/06/02/inline-variable-declarations-in-pascal-progress-or-problem/)

22. Is there, or is there ever going to be, a conditional operator in
    Delphi? - Stack Overflow, accessed March 30, 2026,
    [[https://stackoverflow.com/questions/2108609/is-there-or-is-there-ever-going-to-be-a-conditional-operator-in-delphi]{.underline}](https://stackoverflow.com/questions/2108609/is-there-or-is-there-ever-going-to-be-a-conditional-operator-in-delphi)

23. Coming in RAD Studio 13: A Conditional Ternary Operator for the
    Delphi Language, accessed March 30, 2026,
    [[https://blogs.embarcadero.com/coming-in-rad-studio-13-a-conditional-ternary-operator-for-the-delphi-language/]{.underline}](https://blogs.embarcadero.com/coming-in-rad-studio-13-a-conditional-ternary-operator-for-the-delphi-language/)

24. RAD Studio 13 Released - Press Releases - Embarcadero, accessed
    March 30, 2026,
    [[https://www.embarcadero.com/press-releases/rad-studio-13-released]{.underline}](https://www.embarcadero.com/press-releases/rad-studio-13-released)

25. Delphi 13 Florence: New Features for Modern Developers, accessed
    March 30, 2026,
    [[https://www.delphientwickler.de/en/?view=article&id=340:delphi-13-florence-new-features-for-modern-developers-ed1029a0&catid=13]{.underline}](https://www.delphientwickler.de/en/?view=article&id=340:delphi-13-florence-new-features-for-modern-developers-ed1029a0&catid=13)

26. New in Delphi 13 - NameOf - YouTube, accessed March 30, 2026,
    [[https://www.youtube.com/watch?v=a_bVezFn-vo]{.underline}](https://www.youtube.com/watch?v=a_bVezFn-vo)

27. About the new Delphi 13 "magic" routine NameOf (also UnitName),
    accessed March 30, 2026,
    [[https://gabrielmoraru.com/about-the-new-magic-routine-nameof-introduced-in-delphi-13/]{.underline}](https://gabrielmoraru.com/about-the-new-magic-routine-nameof-introduced-in-delphi-13/)

28. Book Review: Delphi Legacy Projects, accessed March 30, 2026,
    [[https://dalijap.blogspot.com/2022/06/book-review-delphi-legacy-projects.html]{.underline}](https://dalijap.blogspot.com/2022/06/book-review-delphi-legacy-projects.html)

29. How to effectively use interfaces for memory management in Delphi -
    Stack Overflow, accessed March 30, 2026,
    [[https://stackoverflow.com/questions/11784840/how-to-effectively-use-interfaces-for-memory-management-in-delphi]{.underline}](https://stackoverflow.com/questions/11784840/how-to-effectively-use-interfaces-for-memory-management-in-delphi)

30. Spring4D - Pascal Today, accessed March 30, 2026,
    [[https://pascaltoday.wordpress.com/2016/08/13/spring4d/]{.underline}](https://pascaltoday.wordpress.com/2016/08/13/spring4d/)

31. System.Generics.Collections - RAD Studio API Documentation -
    Embarcadero DocWiki, accessed March 30, 2026,
    [[https://docwiki.embarcadero.com/Libraries/en/System.Generics.Collections]{.underline}](https://docwiki.embarcadero.com/Libraries/en/System.Generics.Collections)

32. Delphi 2 can compile large .pas files at 1.2M lines per second \|
    Hacker News, accessed March 30, 2026,
    [[https://news.ycombinator.com/item?id=24735366]{.underline}](https://news.ycombinator.com/item?id=24735366)

33. What\'s a good directory structure for larger C++ projects using
    Makefile? - Stack Overflow, accessed March 30, 2026,
    [[https://stackoverflow.com/questions/2360734/whats-a-good-directory-structure-for-larger-c-projects-using-makefile]{.underline}](https://stackoverflow.com/questions/2360734/whats-a-good-directory-structure-for-larger-c-projects-using-makefile)

34. zproject/README.md at master - GitHub, accessed March 30, 2026,
    [[https://github.com/zeromq/zproject/blob/master/README.md]{.underline}](https://github.com/zeromq/zproject/blob/master/README.md)

35. omonien/DX.Logger: Minimalistic cross-platform logging library for
    Delphi with extensible provider architecture - GitHub, accessed
    March 30, 2026,
    [[https://github.com/omonien/DX.Logger]{.underline}](https://github.com/omonien/DX.Logger)

36. WASDeTT-3 - Faculté d\'informatique, accessed March 30, 2026,
    [[https://www.info.fundp.ac.be/wasdett2010/wp-content/uploads/2010/08/WASDeTT-3.pdf]{.underline}](https://www.info.fundp.ac.be/wasdett2010/wp-content/uploads/2010/08/WASDeTT-3.pdf)

37. Type Declarations - RAD Studio - Embarcadero DocWiki, accessed March
    30, 2026,
    [[https://docwiki.embarcadero.com/RADStudio/en/Type_Declarations]{.underline}](https://docwiki.embarcadero.com/RADStudio/en/Type_Declarations)

38. Ternary operator: bad or good practice? \[duplicate\] - Stack
    Overflow, accessed March 30, 2026,
    [[https://stackoverflow.com/questions/694814/ternary-operator-bad-or-good-practice]{.underline}](https://stackoverflow.com/questions/694814/ternary-operator-bad-or-good-practice)

39. Should I utilise the ternary operator over a simple if statement? -
    Quora, accessed March 30, 2026,
    [[https://www.quora.com/Should-I-utilise-the-ternary-operator-over-a-simple-if-statement]{.underline}](https://www.quora.com/Should-I-utilise-the-ternary-operator-over-a-simple-if-statement)

40. Delphi - Equivalent to C#\'s ternary operator? - Stack Overflow,
    accessed March 30, 2026,
    [[https://stackoverflow.com/questions/5241982/delphi-equivalent-to-cs-ternary-operator]{.underline}](https://stackoverflow.com/questions/5241982/delphi-equivalent-to-cs-ternary-operator)

41. Formatter Options - RAD Studio - Embarcadero DocWiki, accessed March
    30, 2026,
    [[https://docwiki.embarcadero.com/RADStudio/en/Formatter_Options]{.underline}](https://docwiki.embarcadero.com/RADStudio/en/Formatter_Options)

42. There is already a standard code style \| The curse of Dennis D.
    Spreen, accessed March 30, 2026,
    [[https://blog.spreendigital.de/2014/02/03/there-is-already-a-standard-code-style/]{.underline}](https://blog.spreendigital.de/2014/02/03/there-is-already-a-standard-code-style/)
