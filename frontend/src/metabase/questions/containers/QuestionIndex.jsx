import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

// import ActionGroup from "metabase/components/ActionGroup";
import Icon from "metabase/components/Icon";
import ExpandingSearchField from "../components/ExpandingSearchField";
import Tooltip from "metabase/components/Tooltip";
import PageModal from "metabase/components/PageModal";

import CollectionButtons from "../components/CollectionButtons"

import EntityList from "./EntityList";

import { selectSection } from "../questions";
import { loadCollections } from "../collections";


const mapStateToProps = (state, props) => ({
    items: state.questions.entities.cards,
    sectionId: state.questions.section,
    collections: state.collections.collections
})

const mapDispatchToProps = ({
    selectSection,
    loadCollections
})

@connect(mapStateToProps, mapDispatchToProps)
export default class QuestionIndex extends Component {
    constructor () {
        super();
        this.state = {
            questionsExpanded: true
        }
    }
    componentWillMount () {
        this.props.selectSection('all');
        this.props.loadCollections();
    }

    render () {
        const { collections } = this.props;
        const { questionsExpanded } = this.state;
        return (
            <div className="relative mx4">
                <div className="flex align-center py4">
                    { /* TODO - check if user is an admin before showing */}
                    <h2>Collections of Questions</h2>

                    <div className="flex align-center ml-auto">
                        <ExpandingSearchField className="mr2"/>

                        <Tooltip tooltip="Set permissions for collections">
                            <Link to="/collections/permissions">
                                <Icon name="lock" />
                            </Link>
                        </Tooltip>

                        <Tooltip tooltip="Archive">
                            <Link to="/questions/archive" className="mx2">
                                <Icon name="archive" />
                            </Link>
                        </Tooltip>
                    </div>
                </div>
                <div className="mb2">
                    <CollectionButtons collections={collections} />
                </div>
                <div className="flex align-center mt4">
                    {/* TODO: proper arrow icon */}
                    <Icon
                        className="p2"
                        name={questionsExpanded ? "chevrondown" : "chevronright"}
                        onClick={() => this.setState({ questionsExpanded: !questionsExpanded })}
                    />
                    <h2>Everything Else</h2>
                </div>
                { questionsExpanded &&
                    <div className="">
                        <EntityList section="all" collection="" />
                    </div>
                }
            </div>
        )
    }
}
