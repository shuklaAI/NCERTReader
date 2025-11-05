import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Search,
  Sun,
  Moon,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Atom,
  Microscope,
  Calculator,
  Globe,
  Landmark,
} from 'lucide-react';
import katex from 'katex';

// MOCK DATA - BOOKS AND CHAPTERS
const booksData = [
  {
    id: 'sci_8',
    title: 'Science',
    subject: 'Science',
    class: 'VIII',
    description: 'Comprehensive Science textbook for Class VIII',
    imageUrl: '#8b5cf6',
    icon: Microscope,
    chapters: [
      {
        id: 'sci8_ch1',
        number: 1,
        title: 'Introduction to Matter and Energy',
        content: `Matter and energy are fundamental concepts in physics and chemistry. Matter is defined as anything that occupies space and has mass. Energy is the capacity to do work or bring about a change. In this chapter, we explore the different states of matter: solid, liquid, and gas.

A solid has a definite shape and volume. Examples include wood, metal, and stone. A liquid has a definite volume but takes the shape of its container—water, oil, and mercury are common examples. A gas has neither definite shape nor volume; it expands to fill its container. Air is a mixture of gases including nitrogen, oxygen, and carbon dioxide.

The relationship between matter and energy is described by Einstein's famous equation: $E = mc^2$, where $E$ is energy, $m$ is mass, and $c$ is the speed of light.

Energy exists in many forms: kinetic energy (energy of motion), potential energy (stored energy), thermal energy (heat), and chemical energy (stored in chemical bonds). When a ball is thrown upward, it has kinetic energy; at its highest point, it has maximum potential energy. The total mechanical energy remains constant if no external forces act.

States of matter can change through addition or removal of heat. Melting is the process of converting a solid to a liquid. Freezing is the reverse process. Evaporation converts a liquid to a gas, while condensation converts a gas back to a liquid.

Temperature is a measure of the average kinetic energy of particles in a substance. The formula for kinetic energy is: $KE = \frac{1}{2}mv^2$, where $m$ is mass and $v$ is velocity. Heat is the transfer of thermal energy from one object to another due to temperature difference.

Understanding matter and energy is crucial for comprehending natural phenomena and technological applications. From cooking food to powering vehicles, these concepts play fundamental roles in our daily lives.`,
        sectionCount: 7
      },
      {
        id: 'sci8_ch2',
        number: 2,
        title: 'Chemical Reactions and Equations',
        content: `Chemical reactions are processes in which substances are transformed into new substances with different properties. In a chemical reaction, bonds between atoms are broken and new bonds are formed. A chemical equation represents a chemical reaction using symbols and formulas.

A simple chemical reaction is the burning of magnesium: $2Mg + O_2 \rightarrow 2MgO$. Here, magnesium reacts with oxygen to produce magnesium oxide. The substances on the left side of the arrow are called reactants, and those on the right are called products.

The law of conservation of mass states that matter cannot be created or destroyed in a chemical reaction. Therefore, the number of atoms of each element must be the same on both sides of the equation. This is why we balance chemical equations.

Types of chemical reactions include:
- Combination reactions: $A + B \rightarrow AB$
- Decomposition reactions: $AB \rightarrow A + B$
- Displacement reactions: $A + BC \rightarrow AC + B$
- Double displacement reactions: $AB + CD \rightarrow AD + CB$

In combustion reactions, a substance reacts with oxygen and releases energy as heat and light. For example, the combustion of methane is: $CH_4 + 2O_2 \rightarrow CO_2 + 2H_2O$.

Oxidation and reduction (redox) reactions are fundamental in chemistry. Oxidation is the loss of electrons, while reduction is the gain of electrons. In any redox reaction, the number of electrons lost equals the number gained: $\lvert \Delta e^- \rvert_{\text{lost}} = \lvert \Delta e^- \rvert_{\text{gained}}$.

Reversible reactions can occur in both forward and backward directions. The symbol $\rightleftharpoons$ represents a reversible reaction. At equilibrium, the forward and reverse reactions occur at the same rate.

Chemical reactions release or absorb energy. Exothermic reactions release energy (combustion, neutralization), while endothermic reactions absorb energy (melting of ice, photosynthesis). The enthalpy change, $\Delta H$, represents the heat absorbed or released.

Understanding chemical reactions is essential for explaining natural processes like rusting, fermentation, and respiration.`,
        sectionCount: 8
      },
      {
        id: 'sci8_ch3',
        number: 3,
        title: 'Basic Electricity and Circuits',
        content: `Electricity is the flow of electrons from one place to another. An electric circuit is a closed path through which electric current flows. A simple circuit consists of a source of voltage (battery), a conductor (wire), and a load (bulb).

Electric current is measured in amperes (A). The voltage, measured in volts (V), is the potential difference that drives the current. Resistance, measured in ohms (Ω), opposes the flow of current.

Ohm's Law relates these quantities: $V = IR$, where $V$ is voltage, $I$ is current, and $R$ is resistance. For example, if a 10V battery is connected to a 5Ω resistor, the current is: $I = \frac{V}{R} = \frac{10}{5} = 2A$.

The power dissipated in a resistor is given by: $P = VI = I^2R = \frac{V^2}{R}$. This determines how much electrical energy is converted to heat or light.

There are two types of circuits: series and parallel. In a series circuit, components are connected end-to-end, and the same current flows through each. The total resistance is: $R_{\text{total}} = R_1 + R_2 + R_3 + ...$

In a parallel circuit, components are connected side-by-side, and different currents may flow through each path. The reciprocal of total resistance is: $\frac{1}{R_{\text{total}}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + ...$

Electromotive force (EMF) is the total energy provided by a battery per unit charge: $\mathcal{E} = \frac{W}{q}$, where $W$ is work done and $q$ is charge.

Safety is paramount when working with electricity. Never touch bare wires, and always use circuit breakers and fuses to protect against overcurrent. Grounding provides a safe path for excess current.`,
        sectionCount: 7
      },
      {
        id: 'sci8_ch4',
        number: 4,
        title: 'Magnetism and Electromagnetic Induction',
        content: `Magnetism is a fundamental force of nature. Magnets have two poles: north and south. Like poles repel each other, while opposite poles attract. The magnetic field around a magnet represents the region where magnetic force can be felt.

A magnetic field is invisible but can be visualized using magnetic field lines. These lines always emerge from the north pole and enter the south pole. The density of field lines indicates the strength of the magnetic field.

When electric current flows through a conductor, it creates a magnetic field. This principle is used in electromagnets. An electromagnet consists of a coil of wire wrapped around an iron core. When current flows, the iron becomes magnetized.

The strength of an electromagnet depends on:
- The magnitude of current ($I$)
- The number of turns in the coil ($N$)
- The permeability of the core material

Electromagnetic induction is the phenomenon where a changing magnetic field induces an electric current in a conductor. Faraday's Law of electromagnetic induction states: $\mathcal{E} = -\frac{d\Phi_B}{dt}$, where $\mathcal{E}$ is the induced EMF and $\Phi_B$ is the magnetic flux.

A transformer uses electromagnetic induction to convert voltages. The relationship between primary and secondary voltages is: $\frac{V_p}{V_s} = \frac{N_p}{N_s}$, where $V$ is voltage and $N$ is the number of turns.

Electric motors convert electrical energy to mechanical energy using the principle that a current-carrying conductor in a magnetic field experiences a force: $F = BIL$, where $B$ is magnetic field strength, $I$ is current, and $L$ is the length of the conductor.

Understanding magnetism and electromagnetic induction is essential for comprehending modern technology like generators, transformers, and electric motors.`,
        sectionCount: 7
      },
    ]
  },
  {
    id: 'math_8',
    title: 'Mathematics',
    subject: 'Mathematics',
    class: 'VIII',
    description: 'Mathematics textbook for Class VIII',
    imageUrl: '#f59e0b',
    icon: Calculator,
    chapters: [
      {
        id: 'math8_ch1',
        number: 1,
        title: 'Rational Numbers and Operations',
        content: `Rational numbers are numbers that can be expressed as the ratio of two integers. A rational number has the form $\frac{p}{q}$, where $p$ and $q$ are integers and $q \neq 0$.

Rational numbers include all integers, fractions, and terminating or repeating decimals. Examples include $\frac{3}{4}$, $\frac{-5}{2}$, $0.5$, and $0.\overline{3}$ (which equals $\frac{1}{3}$).

The properties of rational numbers are:
- Closure property: The sum or product of two rational numbers is rational
- Commutative property: $a + b = b + a$ and $a \times b = b \times a$
- Associative property: $(a + b) + c = a + (b + c)$ and $(a \times b) \times c = a \times (b \times c)$
- Distributive property: $a \times (b + c) = a \times b + a \times c$

When adding rational numbers: $\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}$

When multiplying: $\frac{a}{b} \times \frac{c}{d} = \frac{ac}{bd}$

When dividing: $\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \times \frac{d}{c} = \frac{ad}{bc}$

Rational numbers can be represented on a number line. Between any two rational numbers, there are infinitely many rational numbers. This is called the density property of rational numbers.

The absolute value of a rational number $\lvert \frac{p}{q} \rvert = \frac{\lvert p \rvert}{\lvert q \rvert}$ represents its distance from zero on the number line.

Rational numbers are fundamental to algebra and are used extensively in science, economics, and engineering.`,
        sectionCount: 8
      },
      {
        id: 'math8_ch2',
        number: 2,
        title: 'Algebraic Expressions and Equations',
        content: `An algebraic expression is a combination of variables, constants, and operators. Examples include $3x + 2$, $x^2 - 4x + 5$, and $\frac{2a + b}{c}$.

Terms in an algebraic expression are parts separated by addition or subtraction. Like terms have the same variable raised to the same power and can be combined. For instance, $3x$ and $5x$ are like terms and can be combined to get $8x$.

Expansion of algebraic expressions uses the distributive property: $a(b + c) = ab + ac$.

For example, $(x + 2)(x + 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6$.

Factorization is the reverse process of expansion. We express an algebraic expression as a product of its factors. For instance:
$x^2 + 5x + 6 = (x + 2)(x + 3)$

Common factorization methods include:
- Common factors: $6x + 9 = 3(2x + 3)$
- Difference of squares: $a^2 - b^2 = (a + b)(a - b)$
- Perfect square trinomials: $a^2 + 2ab + b^2 = (a + b)^2$

An equation is a statement that two expressions are equal. Solving equations involves finding the value of the variable that makes the equation true.

In a linear equation like $2x + 5 = 13$, we isolate the variable:
$2x = 13 - 5 = 8$
$x = 4$

Identities are equations that are true for all values of the variable, such as $(a + b)^2 = a^2 + 2ab + b^2$.

Understanding algebraic expressions and equations is foundational for higher mathematics and problem-solving in science and engineering.`,
        sectionCount: 8
      }
    ]
  },
  {
    id: 'soc_8',
    title: 'Social Science',
    subject: 'Social Science',
    class: 'VIII',
    description: 'Social Science textbook for Class VIII',
    imageUrl: '#06b6d4',
    icon: Globe,
    chapters: [
      {
        id: 'soc8_ch1',
        number: 1,
        title: 'Ancient Civilizations',
        content: `Civilization refers to a complex society with cities, central government, organized religion, writing systems, and social hierarchy. The earliest civilizations emerged around 3000 BCE in river valleys.

The Indus Valley Civilization (2500-1500 BCE) was one of the world's earliest civilizations. It covered an area of approximately 1,250,000 square kilometers in the Indian subcontinent. Major cities included Harappa and Mohenjo-daro, which featured:
- Well-planned streets in a grid pattern
- Advanced drainage and water supply systems
- Standardized weights and measures
- Seal stones used for trade and identification

The civilization developed a script that remains undeciphered. Archaeological evidence suggests a sophisticated administrative system and extensive trade networks extending to Mesopotamia and Egypt.

The Egyptian civilization emerged around 3100 BCE along the Nile River. The annual flooding of the Nile provided fertile soil for agriculture. Egyptians developed:
- Hieroglyphic writing system
- Advanced mathematics and geometry
- Monumental architecture (pyramids, temples)
- Complex administrative and religious structures

The Pharaoh was the supreme ruler, considered a divine incarnation. The society was hierarchical:
- Pharaoh and nobility
- Priests and scribes
- Skilled workers and artisans
- Farmers and laborers

The Mesopotamian civilization, between the Tigris and Euphrates rivers, developed cuneiform—one of the earliest writing systems. The Code of Hammurabi (1754 BCE) was a landmark legal document containing $\approx 282$ laws establishing social order and justice.

These civilizations developed complex economic systems, religious beliefs, artistic expressions, and legal frameworks that influenced subsequent human development.`,
        sectionCount: 6
      }
    ]
  },
  {
    id: 'phys_10',
    title: 'Physics',
    subject: 'Physics',
    class: 'X',
    description: 'Physics textbook for Class X',
    imageUrl: '#3b82f6',
    icon: BookOpen,
    chapters: [
      {
        id: 'phys10_ch1',
        number: 1,
        title: 'Motion and Force',
        content: `Motion is a change in position of an object with respect to a reference point. Kinematics is the study of motion without considering forces.

Displacement is the shortest distance between initial and final positions in a specified direction. Velocity is the rate of change of displacement: $v = \frac{\Delta s}{\Delta t}$

Acceleration is the rate of change of velocity: $a = \frac{\Delta v}{\Delta t}$

The three equations of motion are:
- $v = u + at$
- $s = ut + \frac{1}{2}at^2$
- $v^2 - u^2 = 2as$

where $u$ is initial velocity, $v$ is final velocity, $a$ is acceleration, $t$ is time, and $s$ is displacement.

Dynamics is the study of motion considering forces. Force is a push or pull that changes the motion of an object.

Newton's First Law: An object at rest remains at rest, and an object in motion remains in motion unless acted upon by an external force.

Newton's Second Law: The net force acting on an object is proportional to its mass and acceleration: $F = ma$

Newton's Third Law: For every action, there is an equal and opposite reaction: $F_{AB} = -F_{BA}$

Weight is the gravitational force on an object: $W = mg$, where $m$ is mass and $g$ is gravitational acceleration ($\approx 9.8 \, m/s^2$).

Friction is a force that opposes motion. Static friction prevents motion, while kinetic friction acts during motion. The maximum static friction is: $f_s = \mu_s N$, where $\mu_s$ is the coefficient of static friction and $N$ is the normal force.

Momentum is the product of mass and velocity: $p = mv$. The law of conservation of momentum states: $m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'$

Understanding motion and force is essential for engineering, sports science, and vehicle safety.`,
        sectionCount: 8
      },
      {
        id: 'phys10_ch2',
        number: 2,
        title: 'Electricity and Circuits',
        content: `Electric charge is a fundamental property of matter. There are two types: positive and negative. Like charges repel, and opposite charges attract.

Coulomb's Law describes the force between two charges:
$$F = k\frac{\lvert q_1 q_2 \rvert}{r^2}$$
where $k = 8.99 \times 10^9 \, N \cdot m^2/C^2$, $q_1$ and $q_2$ are charges, and $r$ is the distance between them.

Electric field intensity is the force per unit charge:
$$E = \frac{F}{q} = k\frac{\lvert Q \rvert}{r^2}$$

Electric potential is the work done per unit charge to bring a test charge from infinity:
$$V = k\frac{Q}{r}$$

The relationship between electric field and potential is:
$$E = -\frac{dV}{dr}$$

Current is the flow of charge per unit time:
$$I = \frac{Q}{t}$$

The relationship between current, voltage, and resistance (Ohm's Law) is:
$$V = IR$$

Electrical power dissipated in a resistor is:
$$P = VI = I^2 R = \frac{V^2}{R}$$

Energy consumed is:
$$W = Pt = VIt$$

In series circuits: $R_{total} = R_1 + R_2 + R_3 + ...$
$$V_{total} = V_1 + V_2 + V_3 + ...$$
$$I = I_1 = I_2 = I_3 = ...$$

In parallel circuits: $\frac{1}{R_{total}} = \frac{1}{R_1} + \frac{1}{R_2} + \frac{1}{R_3} + ...$
$$V = V_1 = V_2 = V_3 = ...$$
$$I_{total} = I_1 + I_2 + I_3 + ...$$

Understanding electricity and circuits is fundamental for all electrical engineering and modern technology.`,
        sectionCount: 8
      }
    ]
  },
  {
    id: 'chem_10',
    title: 'Chemistry',
    subject: 'Chemistry',
    class: 'X',
    description: 'Chemistry textbook for Class X',
    imageUrl: '#10b981',
    icon: Atom,
    chapters: [
      {
        id: 'chem10_ch1',
        number: 1,
        title: 'Atomic Structure',
        content: `An atom is the basic unit of matter. Early atomic models proposed that atoms were indivisible, but experiments revealed internal structure.

Dalton's Atomic Theory (1803) proposed:
- All matter is made of atoms
- Atoms cannot be created or destroyed
- All atoms of an element are identical
- Atoms combine in simple whole-number ratios to form compounds

Thomson's Cathode Ray Experiment (1897) discovered the electron. He determined the charge-to-mass ratio of the electron: $\frac{e}{m} = 1.76 \times 10^{11} \, C/kg$

Rutherford's Gold Foil Experiment (1911) revealed the nuclear structure of the atom. Most of the atom is empty space, with mass concentrated in a nucleus.

Bohr's Model (1913) proposed that electrons occupy discrete energy levels (shells) around the nucleus. The energy of the $n$-th shell is:
$$E_n = -\frac{13.6 \, eV}{n^2}$$

The ionization energy is the energy required to remove an electron from an atom. The first ionization energy is:
$$IE_1 = E_\infty - E_1 = 13.6 \, eV$$

The Quantum Mechanical Model describes electrons as existing in probability distributions (orbitals) rather than fixed paths. Orbitals are labeled as $s$, $p$, $d$, and $f$ based on their shapes.

Electron configuration is the arrangement of electrons in an atom. For example, hydrogen has configuration $1s^1$, and oxygen has $1s^2 2s^2 2p^4$.

Periodic trends including ionization energy, electronegativity, and atomic radius are explained by electron configuration and nuclear charge.

Isotopes are atoms of the same element with different numbers of neutrons. They have the same atomic number $Z$ but different mass numbers $A$.

The mass of a proton is $1.673 \times 10^{-27} \, kg$, and the mass of a neutron is approximately equal. The mass of an electron is $9.109 \times 10^{-31} \, kg$.`,
        sectionCount: 8
      }
    ]
  },
  {
    id: 'math_10',
    title: 'Mathematics',
    subject: 'Mathematics',
    class: 'X',
    description: 'Mathematics textbook for Class X',
    imageUrl: '#f59e0b',
    icon: Calculator,
    chapters: [
      {
        id: 'math10_ch1',
        number: 1,
        title: 'Quadratic Equations',
        content: `A quadratic equation is a polynomial equation of degree 2. The general form is:
$$ax^2 + bx + c = 0$$
where $a$, $b$, and $c$ are coefficients and $a \neq 0$.

Methods for solving quadratic equations include:

1. Factorization: If $ax^2 + bx + c = (px + q)(rx + s) = 0$, then $x = -\frac{q}{p}$ or $x = -\frac{s}{r}$

2. Completing the square: Transform $ax^2 + bx + c = 0$ into $(x + h)^2 = k$

3. Quadratic formula: The solutions are given by:
$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

The discriminant $\Delta = b^2 - 4ac$ determines the nature of roots:
- If $\Delta > 0$: Two distinct real roots
- If $\Delta = 0$: One repeated real root
- If $\Delta < 0$: No real roots (two complex roots)

Vieta's formulas relate the roots to the coefficients:
$$\text{Sum of roots} = -\frac{b}{a}$$
$$\text{Product of roots} = \frac{c}{a}$$

Applications of quadratic equations include physics (projectile motion), economics (profit maximization), and engineering (structural analysis).

For example, if an object is thrown upward with initial velocity $v_0$, its height at time $t$ is:
$$h(t) = h_0 + v_0 t - \frac{1}{2}gt^2$$

Setting $h(t) = 0$ gives a quadratic equation for the time when the object hits the ground.

Quadratic inequalities $ax^2 + bx + c > 0$ or $ax^2 + bx + c < 0$ can be solved by analyzing the parabola's position relative to the x-axis.`,
        sectionCount: 7
      }
    ]
  },
  {
    id: 'hist_10',
    title: 'History and Geography',
    subject: 'History and Geography',
    class: 'X',
    description: 'History and Geography textbook for Class X',
    imageUrl: '#8b5cf6',
    icon: Landmark,
    chapters: [
      {
        id: 'hist10_ch1',
        number: 1,
        title: 'Medieval India',
        content: `Medieval India spans from approximately the 8th century to the 18th century, characterized by the rise of various kingdoms and empires, religious developments, and cultural flourishing.

The Delhi Sultanate (1206-1526 CE) was established by Muhammad of Ghor after his victories in North India. It experienced various dynasties:
- Slave Dynasty (1206-1290)
- Khilji Dynasty (1290-1320)
- Tughlaq Dynasty (1320-1413)
- Sayyid Dynasty (1414-1451)
- Lodi Dynasty (1451-1526)

The Mughal Empire (1526-1857) was founded by Babur at the Battle of Panipat. It reached its zenith under Akbar (1556-1605) with:
- Centralized administration
- Religious tolerance and syncretism
- Development of Indo-Islamic architecture
- Encouragement of arts and literature

Akbar implemented the Mansabdari system for military organization and revenue collection. The Mughal Empire's land area was approximately 4.2 million square kilometers at its peak.

The Deccan Sultanates included:
- Bahmani Sultanate
- Adil Shahi Dynasty
- Nizam Shahi Dynasty
- Imad Shahi Dynasty
- Barid Shahi Dynasty

The Vijayanagara Empire (1336-1646) was a major South Indian power. It patronized arts, literature, and architecture. The city of Vijayanagara was one of the largest cities of its time.

Cultural achievements of Medieval India include:
- Architecture: Qutb Minar, Taj Mahal, Char Minar
- Literature: Persian, Sanskrit, and regional languages flourished
- Music: Development of Hindustani and Carnatic classical music systems
- Painting: Mughal miniature paintings

Economic activities included agriculture, trade, and craft production. The textile industry was particularly advanced, with Indian cotton highly valued in global markets.

Medieval India was a period of significant cultural synthesis, blending Hindu, Islamic, and other cultural elements to create unique artistic and literary traditions.`,
        sectionCount: 8
      }
    ]
  },
  {
    id: 'econ_12',
    title: 'Economics',
    subject: 'Economics',
    class: 'XII',
    description: 'Economics textbook for Class XII',
    imageUrl: '#ec4899',
    icon: Globe,
    chapters: [
      {
        id: 'econ12_ch1',
        number: 1,
        title: 'Introduction to Microeconomics',
        content: `Microeconomics is the study of individual agents (consumers, firms) and their interactions in specific markets. It analyzes how prices and quantities are determined.

The basic economic problem is scarcity: unlimited wants but limited resources. Economizing involves making choices about what to produce, how to produce, and for whom to produce.

The Production Possibilities Frontier (PPF) represents the maximum combinations of two goods that can be produced with given resources and technology. The slope of the PPF represents the opportunity cost.

Opportunity cost is what is given up when choosing one alternative over another. For instance, if a student studies for 1 hour, the opportunity cost is the leisure time forgone.

The law of demand states that as price increases, quantity demanded decreases, ceteris paribus (all else constant). The demand curve has a negative slope. Mathematically:
$$Q_d = a - bP$$
where $Q_d$ is quantity demanded, $P$ is price, and $a$, $b$ are constants with $b > 0$.

The law of supply states that as price increases, quantity supplied increases, ceteris paribus:
$$Q_s = c + dP$$
where $Q_s$ is quantity supplied, and $c$, $d$ are constants with $d > 0$.

Market equilibrium occurs where quantity demanded equals quantity supplied:
$$Q_d = Q_s$$

This determines the equilibrium price $P^*$ and equilibrium quantity $Q^*$.

Price elasticity of demand measures responsiveness of quantity demanded to price changes:
$$E_d = \frac{\% \, \text{change in } Q_d}{\% \, \text{change in } P} = \frac{\Delta Q_d / Q_d}{\Delta P / P}$$

If $\lvert E_d \rvert > 1$: demand is elastic (sensitive to price)
If $\lvert E_d \rvert < 1$: demand is inelastic (insensitive to price)
If $\lvert E_d \rvert = 1$: demand is unit elastic

Consumer surplus is the difference between what consumers are willing to pay and what they actually pay. Producer surplus is the difference between what producers receive and their minimum acceptable price.

Total surplus in a market is $CS + PS$. Market equilibrium maximizes total surplus under perfect competition.

Understanding microeconomic principles is essential for making informed decisions about consumption, investment, and business strategy.`,
        sectionCount: 9
      },
      {
        id: 'econ12_ch2',
        number: 2,
        title: 'National Income and Accounting',
        content: `National Income accounting measures the total economic output of a country. Key indicators include GDP, GNP, NDP, and NNP.

Gross Domestic Product (GDP) is the total market value of all final goods and services produced within a country's borders during a specific period, usually one year.

$$\text{GDP} = C + I + G + (X - M)$$

where:
- $C$ = Consumption spending
- $I$ = Investment spending
- $G$ = Government spending
- $X$ = Exports
- $M$ = Imports

GDP can be calculated using three approaches:

1. Expenditure Approach: $\text{GDP} = C + I + G + (X - M)$

2. Income Approach: $\text{GDP} = W + R + i + \pi + D$
   - $W$ = Wages
   - $R$ = Rent
   - $i$ = Interest
   - $\pi$ = Profit
   - $D$ = Depreciation

3. Value Added Approach: Sum of value added at each stage of production

Gross National Product (GNP) is the total market value of all final goods and services produced by a country's residents, regardless of location:
$$\text{GNP} = \text{GDP} + \text{NFIA}$$
where NFIA is Net Factor Income from Abroad.

Net Domestic Product (NDP) accounts for depreciation:
$$\text{NDP} = \text{GDP} - \text{Depreciation}$$

National Income (NI) is the total income earned by residents:
$$\text{NI} = \text{GDP} + \text{NFIA} - \text{Depreciation}$$

Per capita income is:
$$\text{Per capita income} = \frac{\text{National Income}}{\text{Population}}$$

Real GDP adjusts for inflation:
$$\text{Real GDP} = \frac{\text{Nominal GDP}}{\text{Price Index}} \times 100$$

The multiplier effect shows how initial spending leads to greater total income. If marginal propensity to consume is $c$, the multiplier is:
$$k = \frac{1}{1 - c}$$

Understanding national accounting is crucial for analyzing economic performance and formulating policy.`,
        sectionCount: 9
      }
    ]
  }
];

// UTILITY FUNCTIONS FOR MATH RENDERING
const renderMath = (content, isDark) => {
  const parts = [];
  let lastIndex = 0;

  // Regex to find display math ($$...$$)
  const displayRegex = /\$\$([^$]+)\$\$/g;
  let match;

  // First pass: collect display math
  const displayMatches = [];
  while ((match = displayRegex.exec(content)) !== null) {
    displayMatches.push({
      start: match.index,
      end: match.index + match[0].length,
      formula: match[1],
      isDisplay: true,
      isInline: false
    });
  }

  // Second pass: find inline math ($ ... $), excluding display math
  const inlineRegex = /\$([^$]+)\$/g;
  const inlineMatches = [];
  while ((match = inlineRegex.exec(content)) !== null) {
    const isInDisplay = displayMatches.some(dm => match.index >= dm.start && match.index < dm.end);
    if (!isInDisplay) {
      inlineMatches.push({
        start: match.index,
        end: match.index + match[0].length,
        formula: match[1],
        isDisplay: false,
        isInline: true
      });
    }
  }

  // Combine and sort
  const allMatches = [...displayMatches, ...inlineMatches].sort((a, b) => a.start - b.start);

  // Split content and render
  lastIndex = 0;
  allMatches.forEach((m, idx) => {
    if (lastIndex < m.start) {
      parts.push({
        type: 'text',
        content: content.substring(lastIndex, m.start)
      });
    }

    try {
      const rendered = katex.renderToString(m.formula, {
        throwOnError: false,
        displayMode: m.isDisplay,
        output: 'html'
      });

      parts.push({
        type: 'math',
        content: rendered,
        isDisplay: m.isDisplay
      });
    } catch (e) {
      parts.push({
        type: 'text',
        content: `[Math error: ${m.formula}]`
      });
    }

    lastIndex = m.end;
  });

  if (lastIndex < content.length) {
    parts.push({
      type: 'text',
      content: content.substring(lastIndex)
    });
  }

  return parts;
};

// SVG DIAGRAM COMPONENTS
const CircuitDiagram = ({ isDark }) => {
  const strokeColor = isDark ? '#f3f4f6' : '#111827';
  const textColor = isDark ? '#f3f4f6' : '#111827';

  return (
    <div className={`flex flex-col items-center gap-2 my-6 p-4 border-2 rounded-lg ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
      <svg width="350" height="200" viewBox="0 0 350 200" className="border-0">
        {/* Battery */}
        <line x1="50" y1="50" x2="50" y2="150" stroke={strokeColor} strokeWidth="2" />
        <line x1="70" y1="40" x2="70" y2="160" stroke={strokeColor} strokeWidth="2" />
        <line x1="50" y1="50" x2="120" y2="50" stroke={strokeColor} strokeWidth="2" />

        {/* Resistor */}
        <path
          d="M 150 50 L 160 40 L 170 60 L 180 40 L 190 60 L 200 50"
          stroke={strokeColor}
          strokeWidth="2"
          fill="none"
        />

        {/* Wire connections */}
        <line x1="200" y1="50" x2="280" y2="50" stroke={strokeColor} strokeWidth="2" />
        <line x1="280" y1="50" x2="280" y2="100" stroke={strokeColor} strokeWidth="2" />
        <line x1="280" y1="100" x2="70" y2="100" stroke={strokeColor} strokeWidth="2" />

        {/* Bulb */}
        <circle cx="100" cy="150" r="15" fill="none" stroke={strokeColor} strokeWidth="2" />
        <circle cx="100" cy="150" r="8" fill="none" stroke={strokeColor} strokeWidth="1" />

        {/* Labels */}
        <text x="20" y="110" fontSize="12" fill={textColor}>Battery</text>
        <text x="160" y="30" fontSize="12" fill={textColor}>Resistor</text>
        <text x="85" y="175" fontSize="12" fill={textColor}>Bulb</text>
      </svg>
      <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Figure 1: Simple Series Circuit
      </p>
    </div>
  );
};

const CellDiagram = ({ isDark }) => {
  const strokeColor = isDark ? '#f3f4f6' : '#111827';
  const fillColor = isDark ? 'rgba(243, 244, 246, 0.1)' : 'rgba(17, 24, 39, 0.05)';
  const textColor = isDark ? '#f3f4f6' : '#111827';

  return (
    <div className={`flex flex-col items-center gap-2 my-6 p-4 border-2 rounded-lg ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
      <svg width="350" height="250" viewBox="0 0 350 250" className="border-0">
        {/* Cell membrane */}
        <ellipse cx="150" cy="120" rx="100" ry="80" fill={fillColor} stroke={strokeColor} strokeWidth="2" />

        {/* Nucleus */}
        <ellipse cx="150" cy="80" rx="40" ry="35" fill={fillColor} stroke={strokeColor} strokeWidth="2" />

        {/* Nucleolus */}
        <circle cx="150" cy="80" r="12" fill="none" stroke={strokeColor} strokeWidth="1.5" />

        {/* Cytoplasm detail (ribosomes) */}
        <circle cx="110" cy="120" r="3" fill={strokeColor} />
        <circle cx="190" cy="130" r="3" fill={strokeColor} />
        <circle cx="140" cy="150" r="3" fill={strokeColor} />

        {/* Mitochondria */}
        <rect x="95" y="155" width="35" height="20" rx="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        <line x1="108" y1="155" x2="108" y2="175" stroke={strokeColor} strokeWidth="1" />

        {/* Labels */}
        <text x="165" y="85" fontSize="12" fill={textColor}>Nucleus</text>
        <text x="50" y="130" fontSize="12" fill={textColor}>Cytoplasm</text>
        <text x="60" y="175" fontSize="12" fill={textColor}>Mitochondria</text>
        <text x="220" y="120" fontSize="12" fill={textColor}>Cell Membrane</text>
      </svg>
      <p className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        Figure 2: Animal Cell Structure
      </p>
    </div>
  );
};

// HEADER COMPONENT
const Header = ({ theme, onThemeToggle, showBack, onBack, title }) => {
  return (
    <header className={`${
      theme === 'light'
        ? 'bg-white border-gray-200'
        : 'bg-gray-800 border-gray-700'
    } border-b sticky top-0 z-40 transition-colors`}>
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              onClick={onBack}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'light'
                  ? 'hover:bg-gray-100'
                  : 'hover:bg-gray-700'
              }`}
            >
              <ArrowLeft size={24} className={theme === 'light' ? 'text-gray-900' : 'text-gray-100'} />
            </button>
          )}
          <h1 className={`text-xl md:text-2xl font-bold ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>
            {title || 'NCERT Library'}
          </h1>
        </div>

        <button
          onClick={onThemeToggle}
          className={`p-2 rounded-lg transition-colors ${
            theme === 'light'
              ? 'bg-indigo-100 hover:bg-indigo-200'
              : 'bg-indigo-900 hover:bg-indigo-800'
          }`}
        >
          {theme === 'light' ? (
            <Moon size={24} className="text-indigo-600" />
          ) : (
            <Sun size={24} className="text-indigo-400" />
          )}
        </button>
      </div>
    </header>
  );
};

// BOOK CARD COMPONENT
const BookCard = ({ book, onClick, theme }) => {
  const IconComponent = book.icon;

  return (
    <div
      onClick={onClick}
      className={`rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
        theme === 'light'
          ? 'bg-white shadow-sm hover:shadow-md'
          : 'bg-gray-800 shadow-md hover:shadow-lg'
      }`}
    >
      {/* Cover */}
      <div className={`h-32 flex items-center justify-center`} style={{
        backgroundColor: book.imageUrl,
        opacity: theme === 'light' ? 1 : 0.8
      }}>
        <IconComponent size={48} className="text-white" />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className={`font-bold text-lg mb-2 ${
          theme === 'light' ? 'text-gray-900' : 'text-gray-100'
        }`}>
          {book.title}
        </h3>
        <p className={`text-sm mb-3 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {book.subject}
        </p>
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
          theme === 'light'
            ? 'bg-indigo-100 text-indigo-800'
            : 'bg-indigo-900 text-indigo-100'
        }`}>
          Class {book.class}
        </div>
      </div>
    </div>
  );
};

// LIBRARY VIEW COMPONENT
const LibraryView = ({ books, theme, onSelectBook, searchQuery, onSearchChange, classFilter, onClassFilterChange }) => {
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesClass = classFilter === 'All' || book.class === classFilter;
    return matchesSearch && matchesClass;
  });

  return (
    <div className={`min-h-screen ${
      theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'
    } transition-colors`}>
      {/* Search and Filter */}
      <div className={`${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
      } border-b sticky top-16 z-30`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={20} className={`absolute left-3 top-3 ${
                theme === 'light' ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search books by title..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors ${
                  theme === 'light'
                    ? 'bg-white border-gray-200 text-gray-900'
                    : 'bg-gray-700 border-gray-600 text-gray-100'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className={`absolute right-3 top-3 ${
                    theme === 'light' ? 'text-gray-400 hover:text-gray-600' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Filter */}
            <select
              value={classFilter}
              onChange={(e) => onClassFilterChange(e.target.value)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                theme === 'light'
                  ? 'bg-white border-gray-200 text-gray-900'
                  : 'bg-gray-700 border-gray-600 text-gray-100'
              }`}
            >
              <option value="All">All Classes</option>
              <option value="VIII">Class VIII</option>
              <option value="X">Class X</option>
              <option value="XII">Class XII</option>
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => onSelectBook(book)}
                theme={theme}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className={`text-lg ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              No books found
            </p>
            <p className={`text-sm mt-2 ${
              theme === 'light' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              Try adjusting your search or filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// CHAPTER SIDEBAR COMPONENT
const ChapterSidebar = ({ book, selectedChapter, onSelectChapter, theme, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-20"
        />
      )}

      {/* Sidebar */}
      <aside className={`${
        isOpen
          ? 'fixed left-0 top-0 w-64 h-full z-30 translate-x-0'
          : 'fixed left-0 top-0 w-64 h-full z-30 -translate-x-full'
      } md:relative md:w-72 md:translate-x-0 transition-transform ${
        theme === 'light'
          ? 'bg-gray-50'
          : 'bg-gray-800'
      } border-r ${
        theme === 'light' ? 'border-gray-200' : 'border-gray-700'
      } md:sticky md:top-16 md:h-[calc(100vh-64px)] overflow-y-auto`}>
        <div className="p-4">
          <h3 className={`font-bold text-lg mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-gray-100'
          }`}>
            Chapters
          </h3>

          {book.chapters.map(chapter => (
            <button
              key={chapter.id}
              onClick={() => {
                onSelectChapter(chapter);
                onClose();
              }}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                selectedChapter?.id === chapter.id
                  ? theme === 'light'
                    ? 'bg-indigo-100 text-indigo-900 font-semibold'
                    : 'bg-indigo-900 text-indigo-100 font-semibold'
                  : theme === 'light'
                    ? 'text-gray-700 hover:bg-gray-100'
                    : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className={`block text-sm font-medium`}>
                Chapter {chapter.number}
              </span>
              <span className={`block text-xs mt-1 ${
                selectedChapter?.id === chapter.id
                  ? 'opacity-90'
                  : 'opacity-75'
              }`}>
                {chapter.title}
              </span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
};

// CONTENT AREA COMPONENT
const ContentArea = ({ chapter, theme, book, onPrevChapter, onNextChapter, canGoPrev, canGoNext }) => {
  const mathParts = renderMath(chapter.content, theme === 'dark');

  return (
    <main className={`flex-1 ${
      theme === 'light' ? 'bg-white' : 'bg-gray-800'
    }`}>
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Chapter Title */}
        <h2 className={`text-3xl font-bold mb-2 ${
          theme === 'light' ? 'text-gray-900' : 'text-gray-100'
        }`}>
          Chapter {chapter.number}: {chapter.title}
        </h2>
        <p className={`text-sm mb-8 ${
          theme === 'light' ? 'text-gray-600' : 'text-gray-400'
        }`}>
          {book.title} - Class {book.class}
        </p>

        {/* Content */}
        <div className={`prose max-w-none leading-relaxed ${
          theme === 'light'
            ? 'prose-gray text-gray-900'
            : 'prose-invert text-gray-100'
        }`}>
          {mathParts.map((part, idx) => {
            if (part.type === 'text') {
              return part.content.split('\n\n').map((para, pidx) => (
                para.trim() && (
                  <p key={`${idx}-${pidx}`} className={`mb-4 text-base leading-relaxed ${
                    theme === 'light' ? 'text-gray-900' : 'text-gray-100'
                  }`}>
                    {para}
                  </p>
                )
              ));
            } else if (part.type === 'math') {
              return (
                <div
                  key={idx}
                  className={`${part.isDisplay ? 'my-6 flex justify-center' : 'inline'}`}
                  dangerouslySetInnerHTML={{ __html: part.content }}
                />
              );
            }
          })}

          {/* Diagrams */}
          {chapter.id === 'phys10_ch1' && <CircuitDiagram isDark={theme === 'dark'} />}
          {chapter.id === 'sci8_ch1' && <CellDiagram isDark={theme === 'dark'} />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-300 dark:border-gray-600">
          <button
            onClick={onPrevChapter}
            disabled={!canGoPrev}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              canGoPrev
                ? theme === 'light'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
                : theme === 'light'
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-gray-700 text-gray-500'
            } disabled:cursor-not-allowed`}
          >
            <ChevronLeft size={18} className="inline mr-2" />
            Previous
          </button>

          <span className={`font-medium ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            {chapter.number} / {book.chapters.length}
          </span>

          <button
            onClick={onNextChapter}
            disabled={!canGoNext}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              canGoNext
                ? theme === 'light'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
                : theme === 'light'
                  ? 'bg-gray-200 text-gray-400'
                  : 'bg-gray-700 text-gray-500'
            } disabled:cursor-not-allowed`}
          >
            Next
            <ChevronRight size={18} className="inline ml-2" />
          </button>
        </div>
      </div>
    </main>
  );
};

// READER VIEW COMPONENT
const ReaderView = ({ book, theme, onBack, selectedChapter, onSelectChapter }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!selectedChapter && book.chapters.length > 0) {
    onSelectChapter(book.chapters[0]);
  }

  const currentChapterIndex = book.chapters.findIndex(ch => ch.id === selectedChapter?.id);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-gray-900'}`}>
      <Header
        theme={theme}
        onThemeToggle={() => {}}
        showBack={true}
        onBack={onBack}
        title={`${book.title} - ${selectedChapter?.title}`}
      />

      <div className="flex flex-col md:flex-row md:h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <ChapterSidebar
          book={book}
          selectedChapter={selectedChapter}
          onSelectChapter={onSelectChapter}
          theme={theme}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`md:hidden fixed bottom-6 right-6 z-40 p-3 rounded-full shadow-lg ${
            theme === 'light'
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
        >
          {sidebarOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>

        {/* Content */}
        {selectedChapter && (
          <ContentArea
            chapter={selectedChapter}
            theme={theme}
            book={book}
            onPrevChapter={() => {
              if (currentChapterIndex > 0) {
                onSelectChapter(book.chapters[currentChapterIndex - 1]);
              }
            }}
            onNextChapter={() => {
              if (currentChapterIndex < book.chapters.length - 1) {
                onSelectChapter(book.chapters[currentChapterIndex + 1]);
              }
            }}
            canGoPrev={currentChapterIndex > 0}
            canGoNext={currentChapterIndex < book.chapters.length - 1}
          />
        )}
      </div>
    </div>
  );
};

// MAIN APP COMPONENT
export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ncert_theme') || 'light';
  });
  const [currentView, setCurrentView] = useState(() => {
    const lastBook = localStorage.getItem('ncert_lastBook');
    return lastBook ? 'reader' : 'library';
  });
  const [selectedBook, setSelectedBook] = useState(() => {
    const lastBookId = localStorage.getItem('ncert_lastBook');
    if (lastBookId) {
      return booksData.find(b => b.id === lastBookId) || null;
    }
    return null;
  });
  const [selectedChapter, setSelectedChapter] = useState(() => {
    if (selectedBook) {
      const lastChapterIndex = localStorage.getItem('ncert_lastChapter');
      return selectedBook.chapters[lastChapterIndex || 0] || null;
    }
    return null;
  });
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('ncert_searchQuery') || '';
  });
  const [classFilter, setClassFilter] = useState(() => {
    return localStorage.getItem('ncert_classFilter') || 'All';
  });

  useEffect(() => {
    localStorage.setItem('ncert_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (selectedBook) {
      localStorage.setItem('ncert_lastBook', selectedBook.id);
    }
  }, [selectedBook]);

  useEffect(() => {
    if (selectedChapter && selectedBook) {
      const index = selectedBook.chapters.findIndex(ch => ch.id === selectedChapter.id);
      localStorage.setItem('ncert_lastChapter', index);
    }
  }, [selectedChapter, selectedBook]);

  useEffect(() => {
    localStorage.setItem('ncert_searchQuery', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('ncert_classFilter', classFilter);
  }, [classFilter]);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setSelectedChapter(book.chapters[0]);
    setCurrentView('reader');
  };

  const handleBackToLibrary = () => {
    setCurrentView('library');
  };

  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      {currentView === 'library' ? (
        <>
          <Header
            theme={theme}
            onThemeToggle={handleThemeToggle}
            title="NCERT Library"
          />
          <LibraryView
            books={booksData}
            theme={theme}
            onSelectBook={handleSelectBook}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            classFilter={classFilter}
            onClassFilterChange={setClassFilter}
          />
        </>
      ) : (
        <>
          <Header
            theme={theme}
            onThemeToggle={handleThemeToggle}
            showBack={true}
            onBack={handleBackToLibrary}
            title={selectedBook?.title}
          />
          {selectedBook && (
            <div className="flex relative">
              <ReaderView
                book={selectedBook}
                theme={theme}
                onBack={handleBackToLibrary}
                selectedChapter={selectedChapter}
                onSelectChapter={setSelectedChapter}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
