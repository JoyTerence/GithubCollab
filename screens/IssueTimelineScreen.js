import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import LabeledEvent from './IssueTimelineItems/labeledEvent';
import AssignedEvent from './IssueTimelineItems/assignedEvent';
import UnAssignedEvent from './IssueTimelineItems/unAssignedEvent';
import IssueCommentEvent from './IssueTimelineItems/issueComment';
import UnLabeledEvent from './IssueTimelineItems/unLabeledEvent';
import CrossReferencedEvent from './IssueTimelineItems/crossReferencedEvent';
import ClosedEvent from './IssueTimelineItems/closedEvent';
import ReopenedEvent from './IssueTimelineItems/reopenedEvent';
import RenamedTitleEvent from './IssueTimelineItems/renamedTitleEvent';

class IssueTimelineScreen extends React.Component {

  constructor(props) {
    super(props);
    console.log("IssueTimelineScreen");
    this.data = props.data
    this.timelineEventType = props.data.__typename
  }

  render() {

    let issueTimelineItemView = null

    if (this.timelineEventType == "LabeledEvent") {
      issueTimelineItemView = <LabeledEvent data={this.data}/>
    }
    else if(this.timelineEventType == "AssignedEvent") {
      issueTimelineItemView = <AssignedEvent data={this.data}/>
    }
    else if(this.timelineEventType == "UnassignedEvent") {
      issueTimelineItemView = <UnAssignedEvent data={this.data}/>
    }
    else if(this.timelineEventType == "IssueComment") {
      issueTimelineItemView = <IssueCommentEvent data={this.data}/>
    }
    else if(this.timelineEventType == "UnlabeledEvent") {
      issueTimelineItemView = <UnLabeledEvent data={this.data}/>
    }
    else if(this.timelineEventType == "CrossReferencedEvent") {
      issueTimelineItemView = <CrossReferencedEvent data={this.data}/>
    }
    else if (this.timelineEventType == "ClosedEvent") {
      issueTimelineItemView = <ClosedEvent data={this.data}/>
    }
    else if (this.timelineEventType == "ReopenedEvent") {
      issueTimelineItemView = <ReopenedEvent data={this.data}/>
    }
    else if (this.timelineEventType == "RenamedTitleEvent") {
      issueTimelineItemView = <RenamedTitleEvent data={this.data}/>
    }
    else {
      issueTimelineItemView = <View></View>
    }

    return (
      <View style={{flex: 1 }}>
        {issueTimelineItemView}
      </View>
    );
  }

}

export default IssueTimelineScreen;
