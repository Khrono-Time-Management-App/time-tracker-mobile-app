import React, { useEffect, useRef } from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import {Animated, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {VictoryPie} from 'victory-native';

import {Svg} from 'react-native-svg';
import {COLORS, FONTS, icons, SIZES} from "../../../../constants";
import {millisecondsToTime} from "./ActivityTimer";
import {activities, activitiesReport} from '../selectors';
import { getActivitiesReport } from '../actions';


const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    }
})

const DashboardScreen = ({ activitiesReport, fetchReport, activities }) => {

    const confirmStatus = "C"
    const pendingStatus = "P"
    const currentDate = new Date();

    const displayDuration = (duration) => {
        const [hours, minutes, seconds] = millisecondsToTime(duration);

        return `${hours ? hours : "00" }:${minutes ? minutes : "00" }:${seconds ? seconds : "00" }`
    }

    let categoriesData = [
        {
            id: 1,
            name: "Education",
            icon: icons.education,
            color: COLORS.yellow,
            expenses: [
                {
                    id: 1,
                    title: "Flcd Exam Preparation",
                    description: "You better Study",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: pendingStatus
                },
                {
                    id: 2,
                    title: "Arduino",
                    description: "Hardward",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: pendingStatus
                },
                {
                    id: 3,
                    title: "Javascript Tutorials",
                    description: "Udemy program",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: confirmStatus
                },
                {
                    id: 4,
                    title: "PHP Tutorial",
                    description: "Nobody learns php anymore",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: confirmStatus
                }
            ],
        },
        {
            id: 2,
            name: "Sleep",
            icon: icons.food,
            color: COLORS.lightBlue,
            expenses: [
                {
                    id: 5,
                    title: "Mid-day rest",
                    description: "rest is important",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: pendingStatus,
                },
                {
                    id: 6,
                    title: "Night's sleep",
                    description: "rest is important",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: pendingStatus,
                },
                {
                    id: 7,
                    title: "Night's sleep",
                    description: "rest is important",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: confirmStatus,
                },
                {
                    id: 8,
                    title: "Night's sleep",
                    description: "rest is important",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: confirmStatus,
                },
                {
                    id: 9,
                    title: "Night's sleep",
                    description: "rest is important",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: confirmStatus,
                },
                {
                    id: 10,
                    title: "Protein powder",
                    description: "Protein",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: confirmStatus,
                },

            ],
        },
        {
            id: 3,
            name: "Leisure",
            icon: icons.healthcare,
            color: COLORS.peach,
            expenses: [
                {
                    id: 11,
                    title: "Spa Retreat",
                    description: "It feels nice",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: pendingStatus,
                },
                {
                    id: 12,
                    title: "Detox",
                    description: "Detox is important",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: confirmStatus,
                },
                {
                    id: 13,
                    title: "Detox",
                    description: "Detox is important",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: confirmStatus,
                },
                {
                    id: 14,
                    title: "Beauty Sleep",
                    description: "sleep = nice",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: pendingStatus,
                },
            ],
        },
        {
            id: 4,
            name: "Sports",
            icon: icons.sports_icon,
            color: COLORS.purple,
            expenses: [
                {
                    id: 15,
                    title: "Gym Membership",
                    description: "Monthly - membership",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: pendingStatus,
                },
                {
                    id: 16,
                    title: "Boxing Camp",
                    description: "Cardio is nice",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: confirmStatus,
                },
            ],
        },
        {
            id: 5,
            name: "Work",
            icon: icons.cloth_icon,
            color: COLORS.red,
            expenses: [
                {
                    id: 17,
                    title: "Task 1",
                    description: "We all hate task 1",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: pendingStatus,
                },
                {
                    id: 18,
                    title: "Task 2",
                    description: "We hate task 2 even more",
                    startDateTime: new Date().getTime(),
                    endDateTime: new Date().getTime() + 1000 * 60 * 60,
                    status: confirmStatus,
                },
            ],
        }
    ]

    const categoryListHeightAnimationValue = useRef(new Animated.Value(115)).current;

    const [categories, setCategories] = React.useState(activitiesReport);
    const [viewMode, setViewMode] = React.useState("chart");
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [showMoreToggle, setShowMoreToggle] = React.useState(false);

    useEffect(() => {
        fetchReport();
    }, [activities]);

    useEffect(() => {
        setCategories(activitiesReport);
    }, [activitiesReport]);

    const renderHeader = () => {
        return (
            <View style={{ paddingHorizontal: SIZES.padding, paddingVertical: SIZES.padding, backgroundColor: COLORS.white }}>
                <View>
                    <Text style={{ color: COLORS.primary, marginTop: 24 }}>My activities</Text>
                    <Text style={{ color: COLORS.darkgray }}>Report (private)</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: SIZES.padding, alignItems: 'center' }}>
                    <View style={{
                        backgroundColor: COLORS.lightGray,
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Image
                            source={icons.calendar}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.lightBlue
                            }}
                        />
                    </View>

                    <View style={{ marginLeft: SIZES.padding }}>
                        <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>Past Month</Text>
                        <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>18% more than last month</Text>
                    </View>
                </View>
            </View>
        )
    }

    const renderCategoryHeaderSection = () => {
        return (
            <View style={{ flexDirection: 'row', padding: SIZES.padding, justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Title */}
                <View>
                    <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>CATEGORIES</Text>
                    <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{categories.length} Total</Text>
                </View>

                {/* Button */}
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: viewMode === "chart" ? COLORS.secondary : null,
                            height: 50,
                            width: 50,
                            borderRadius: 25
                        }}
                        onPress={() => setViewMode("chart")}
                    >
                        <Image
                            source={icons.chart}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: viewMode === "chart" ? COLORS.white : COLORS.darkgray,
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: viewMode === "list" ? COLORS.secondary : null,
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            marginLeft: SIZES.base
                        }}
                        onPress={() => setViewMode("list")}
                    >
                        <Image
                            source={icons.menu}
                            resizeMode="contain"
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: viewMode === "list" ? COLORS.white : COLORS.darkgray,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderCategoryList = () => {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                onPress={() => setSelectedCategory(item)}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    margin: 5,
                    paddingVertical: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    borderRadius: 5,
                    backgroundColor: COLORS.white,
                    ...styles.shadow
                }}
            >
                <Image
                    source={item.icon}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: item.color
                    }}
                />
                <Text style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}>{item.name}</Text>
            </TouchableOpacity>
        )

        return (
            <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
                <Animated.View style={{ height: categoryListHeightAnimationValue }}>
                    <FlatList
                        data={categories}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        numColumns={2}
                    />
                </Animated.View>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginVertical: SIZES.base,
                        justifyContent: 'center'
                    }}
                    onPress={() => {
                        if (showMoreToggle) {
                            Animated.timing(categoryListHeightAnimationValue, {
                                toValue: 115,
                                duration: 500,
                                useNativeDriver: false
                            }).start()
                        } else {
                            Animated.timing(categoryListHeightAnimationValue, {
                                toValue: 172.5,
                                duration: 500,
                                useNativeDriver: false
                            }).start()
                        }

                        setShowMoreToggle(!showMoreToggle)
                    }}
                >
                    <Text style={{ ...FONTS.body4 }}>{showMoreToggle ? "LESS" : "MORE"}</Text>
                    <Image
                        source={showMoreToggle ? icons.up_arrow : icons.down_arrow}
                        style={{ marginLeft: 5, width: 15, height: 15, alignSelf: 'center' }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const renderIncomingActivitiesTitle = () => {
        return (
            <View style={{ height: 80, backgroundColor: COLORS.lightGray2, padding: SIZES.padding0 }}>
                {/* Title */}
                <Text style={{ ...FONTS.h2, color: COLORS.primary }}>INCOMING ACTIVITIES</Text>
            </View>
        )
    }


    const renderIncomingActivities = () => {
        let allExpenses = selectedCategory ? selectedCategory.expenses : []
        let incomingExpenses = allExpenses.filter(a => {
            return new Date(a.endDateTime).getTime() >= currentDate.getTime()
        })
        // let incomingExpenses = allExpenses.filter(a => a.status === "P")

        const renderItem = ({ item, index }) => (
            <View style={{
                width: 300,
                marginRight: SIZES.padding,
                marginLeft: index === 0 ? SIZES.padding : 0,
                marginVertical: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.white,
                ...styles.shadow
            }}>
                {/* Title */}
                <View style={{ flexDirection: 'row', padding: SIZES.padding, alignItems: 'center' }}>
                    <View
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 25,
                            backgroundColor: COLORS.lightGray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: SIZES.base
                        }}
                    >
                        <Image
                            source={selectedCategory.icon}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: selectedCategory.color
                            }}
                        />
                    </View>

                    <Text style={{ ...FONTS.h3, color: selectedCategory.color, }}>{selectedCategory.name}</Text>
                </View>

                {/* Activity Description */}
                <View style={{ paddingHorizontal: SIZES.padding }}>
                    {/* Title and description */}
                    <Text style={{ ...FONTS.h2, }}>{item.title}{item.startDateTime <= currentDate.getTime() && " - active"}</Text>
                    <Text style={{ ...FONTS.body3, flexWrap: 'wrap', color: COLORS.darkgray }}>
                        {item.description}
                    </Text>

                    {/* Date */}
                    <Text style={{ marginTop: SIZES.padding, ...FONTS.h4, }}>Date</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={icons.pin}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.darkgray,
                                marginRight: 5
                            }}
                        />
                        <Text style={{ marginBottom: SIZES.base, color: COLORS.darkgray, ...FONTS.body4 }}>{new Date(item.startDateTime).toDateString()}</Text>
                    </View>
                </View>

                {/* Duration */}
                <View
                    style={{
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomStartRadius: SIZES.radius,
                        borderBottomEndRadius: SIZES.radius,
                        backgroundColor: selectedCategory.color,
                    }}
                >
                    <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Duration: {displayDuration(item.endDateTime - item.startDateTime)}</Text>
                </View>
            </View>
        )

        return (
            <View>
                {renderIncomingActivitiesTitle()}

                {
                    incomingExpenses.length > 0 &&
                    <FlatList
                        data={incomingExpenses}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                }

                {
                    incomingExpenses.length === 0 &&
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: 300 }}>
                        <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>No Record</Text>
                    </View>
                }

            </View>
        )
    }

    const processCategoryDataToDisplay = () => {
        let chartData = categories.map((item) => {
            let confirmExpenses = item.expenses.filter(a => a.endDateTime <= currentDate.getTime())
            const total = confirmExpenses.reduce((a, b) => a + ((b.endDateTime - b.startDateTime) / (1000 * 60 * 60) || 0), 0)

            return {
                name: item.name,
                y: total,
                expenseCount: confirmExpenses.length,
                color: item.color,
                id: item.id
            }
        })

        // filter out categories with no data/expenses
        let filterChartData = chartData.filter(a => a.y > 0)

        // Calculate the total expenses
        let totalExpense = filterChartData.reduce((a, b) => a + (b.y || 0), 0)

        // Calculate percentage and repopulate chart data
        return filterChartData.map((item) => {
            let percentage = (item.y / totalExpense * 100).toFixed(0)
            return {
                label: `${percentage}%`,
                y: Number(item.y),
                expenseCount: item.expenseCount,
                color: item.color,
                name: item.name,
                id: item.id
            }
        })
    }

    const setSelectCategoryByName = (name) => {
        let category = categories.filter(a => a.name === name)
        setSelectedCategory(category[0])
    }

    const renderChart = () => {

        let chartData = processCategoryDataToDisplay()
        let colorScales = chartData.map((item) => item.color)
        let totalExpenseCount = chartData.reduce((a, b) => a + (b.expenseCount || 0), 0)

        if(Platform.OS === 'ios')
        {
            return (
                <View  style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <VictoryPie

                        data={chartData}
                        labels={(datum) => `${datum.y}`}
                        radius={({ datum }) => (selectedCategory && selectedCategory.name === datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                        innerRadius={70}
                        labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                        style={{
                            labels: { fill: "white", ...FONTS.body3 },
                            parent: {
                                ...styles.shadow
                            },
                        }}
                        width={SIZES.width * 0.8}
                        height={SIZES.width * 0.8}
                        colorScale={colorScales}
                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPress: () => {
                                    return [{
                                        target: "labels",
                                        mutation: (props) => {
                                            let categoryName = chartData[props.index].name
                                            setSelectCategoryByName(categoryName)
                                        }
                                    }]
                                }
                            }
                        }]}

                    />

                    <View style={{ position: 'absolute', top: '42%', left: "42%" }}>
                        <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Activities</Text>
                    </View>
                </View>

            )
        }
        else
        {
            // Android workaround by wrapping VictoryPie with SVG
            return (
                <View  style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Svg width={SIZES.width} height={SIZES.width} style={{width: "100%", height: "auto"}}>

                        <VictoryPie
                            standalone={false} // Android workaround
                            data={chartData}
                            labels={(datum) => `${datum.y}`}
                            radius={({ datum }) => (selectedCategory && selectedCategory.name === datum.name) ? SIZES.width * 0.4 : SIZES.width * 0.4 - 10}
                            innerRadius={70}
                            labelRadius={({ innerRadius }) => (SIZES.width * 0.4 + innerRadius) / 2.5}
                            style={{
                                labels: { fill: "white", ...FONTS.body3 },
                                parent: {
                                    ...styles.shadow
                                },
                            }}
                            width={SIZES.width}
                            height={SIZES.width}
                            colorScale={colorScales}
                            events={[{
                                target: "data",
                                eventHandlers: {
                                    onPress: () => {
                                        return [{
                                            target: "labels",
                                            mutation: (props) => {
                                                let categoryName = chartData[props.index].name
                                                setSelectCategoryByName(categoryName)
                                            }
                                        }]
                                    }
                                }
                            }]}

                        />
                    </Svg>
                    <View style={{ position: 'absolute', top: '42%', left: "42%" }}>
                        <Text style={{ ...FONTS.h1, textAlign: 'center' }}>{totalExpenseCount}</Text>
                        <Text style={{ ...FONTS.body3, textAlign: 'center' }}>Activities</Text>
                    </View>
                </View>
            )
        }

    }

    const renderExpenseSummary = () => {
        let data = processCategoryDataToDisplay()

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    height: 40,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: (selectedCategory && selectedCategory.name === item.name) ? item.color : COLORS.white
                }}
                onPress={() => {
                    let categoryName = item.name
                    setSelectCategoryByName(categoryName)
                }}
            >
                {/* Name/Category */}
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: (selectedCategory && selectedCategory.name === item.name) ? COLORS.white : item.color,
                            borderRadius: 5
                        }}
                    />

                    <Text style={{ marginLeft: SIZES.base, color: (selectedCategory && selectedCategory.name === item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{item.name}</Text>
                </View>

                {/* Activities */}
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: (selectedCategory && selectedCategory.name === item.name) ? COLORS.white : COLORS.primary, ...FONTS.h3 }}>{parseFloat(item.y).toFixed(2)} Hours - {item.label}</Text>
                </View>
            </TouchableOpacity>
        )

        return (
            <View style={{ padding: SIZES.padding }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                />
            </View>

        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.lightGray2 }}>

            {/* Header section */}
            {renderHeader()}

            {/* Category Header Section */}
            {renderCategoryHeaderSection()}

            <View contentContainerStyle={{ paddingBottom: 60 }}>
                {
                    viewMode === "list" &&
                    <View>
                        {renderCategoryList()}
                        {renderIncomingActivities()}
                    </View>
                }
                {
                    viewMode === "chart" &&
                    <View>
                        {renderChart()}
                        {renderExpenseSummary()}
                    </View>
                }
            </View>
        </View>
    )
};

const mapStateToProps = (state) => ({
    activitiesReport: activitiesReport(state),
    activities: activities(state)
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    fetchReport: getActivitiesReport,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
